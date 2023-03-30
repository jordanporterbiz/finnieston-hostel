import config from 'config'
import { Request, Response } from 'express'
import { UserDocument } from '../models/User.model'
import { createSession, findSessions } from '../services/Session.service'
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
        const session = await createSession(user._id, req.get('User-Agent') || '')
        
        const accessToken = signJwt(
             {...user, session: session._id},
             { expiresIn: config.get('accessTokenTtl') } // 15 minutes
             )

             const refreshToken = signJwt(
                {...user, session: session._id},
                { expiresIn: config.get('accessTokenTtl') } // 15 minutes
                )

        return res.status(201).send({ accessToken, refreshToken})
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
    const sessions = await findSessions({ user: userId, valid: false})
    return res.send(sessions)
}