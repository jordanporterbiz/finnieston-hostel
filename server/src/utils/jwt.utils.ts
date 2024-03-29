import jwt from 'jsonwebtoken'
import config from 'config'
import logger from './logger'

const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

export function signJwt(
    payload: Object,
    options?: jwt.SignOptions | undefined
) {
    const signedJwt = jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
    logger.info('signedJwt', signedJwt)
    return signedJwt
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'TokenExpiredError',
            decoded: null,
        }
    }
}
