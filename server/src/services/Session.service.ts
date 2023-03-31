import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, { SchemaDocument } from '../models/Session.model'
import { verifyJwt, signJwt } from '../utils/jwt.utils'
import { get } from 'lodash'
import { findUser } from './User.service'
import config from 'config'

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent })
    return session.toJSON()
}

export const deleteSession = async (sessionId: string) => {
    const session = await SessionModel.findByIdAndDelete(sessionId)
    return session
}

export const findSessions = async (query: FilterQuery<SchemaDocument>) => {
    const sessions = await SessionModel.find(query).lean()
    return sessions
}

export const findSession = async (sessionId: string) => {}

export const updateSession = async (
    query: FilterQuery<SchemaDocument>,
    update: UpdateQuery<SchemaDocument>
) => {
    return SessionModel.updateOne(query, update)
}

export const reIssueAccessToken = async (
    refreshToken: string
) => {

    const {decoded} = verifyJwt(refreshToken)

    if(!decoded || !get(decoded, '_id')) throw new Error('Invalid refresh token')

    const session = await SessionModel.findById(get(decoded, 'session'))

    if (!session || !session.valid) throw new Error('Invalid refresh token')

    const user = await findUser({ _id: session.user })

    if (!user) throw new Error('User not found')


    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('accessTokenTtl') } // 15 minutes
    )

    // const refreshToken = await createRefreshToken({
    //     user: session.user,
    //     session: session._id,
    // })

    return accessToken
}