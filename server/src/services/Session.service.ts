import { FilterQuery } from 'mongoose'
import SessionModel, { SchemaDocument } from '../models/Session.model'

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent })
    return session.toJSON()
}

export const deleteSession = async (sessionId: string) => { 
    const session = await SessionModel.findByIdAndDelete(sessionId)
    return session
}

export const findSessions = async (query: FilterQuery<SchemaDocument>) => {
    const sessions = await SessionModel.find(query).lean();
    return sessions
}

export const findSession = async (sessionId: string) => {}
