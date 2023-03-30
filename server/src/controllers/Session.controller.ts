import config from 'config'
import { Request, Response } from 'express'
import {
    createSession,
    findSessions,
    updateSession,
} from '../services/Session.service'
import { validatePassword } from '../services/User.service'
import { signJwt } from '../utils/jwt.utils'
import logger from '../utils/logger'

export async function createSessionHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const user = await validatePassword(req.body)

    if (!user) return res.status(401).send('Invalid username or password')

    try {
        const session = await createSession(
            user._id,
            req.get('User-Agent') || ''
        )

        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get('accessTokenTtl') } // 15 minutes
        )

        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get('accessTokenTtl') } // 15 minutes
        )

        return res.status(201).send({ accessToken, refreshToken })
    } catch (e) {
        logger.error(e)
        return res.sendStatus(500)
    }
}

export async function getSessionsHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const userId = res.locals.user._id
    const sessions = await findSessions({ user: userId, valid: true })
    return res.send(sessions)
}

export async function getSessionByIdHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const sessionId = req.params.sessionId
    const userId = res.locals.user._id

    const session = await findSessions({
        _id: sessionId,
        user: userId,
        valid: true,
    })

    if (!session) return res.sendStatus(401)

    return res.send(session)
}

export async function invalidateSessionHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const sessionId = req.params.sessionId
    const userId = res.locals.user._id

    const session = await updateSession(
        { _id: sessionId, user: userId },
        { valid: false }
    )

    if (!session) return res.sendStatus(401)

    return res.sendStatus(200)
}

export async function invalidateAllSessionsHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const userId = res.locals.user._id

    const sessions = await updateSession({ user: userId }, { valid: false })

    if (!sessions) return res.sendStatus(401)

    return res.sendStatus(200)
}

export async function updateSessionHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const userId = res.locals.user._id
    const sessionId = res.locals.user.session

    const session = await updateSession(
        { _id: sessionId, user: userId },
        { valid: false }
    )

    if (!session) return res.sendStatus(401)

    const accessToken = signJwt(
        { ...res.locals.user },
        { expiresIn: config.get('accessTokenTtl') }
    )

    const refreshToken = signJwt(
        { ...res.locals.user },
        { expiresIn: config.get('refreshTokenTtl') }
    )

    return res.send({ accessToken, refreshToken })
}

export async function deleteSessionHandler(
    req: Request,
    res: Response
): Promise<Response> {
    const sessionId = res.locals.user.session

    await updateSession({ _id: sessionId }, { valid: false })
    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}
