import { Request, Response} from 'express'
import logger from '../utils/logger'
import { createUser } from '../services/User.Service'
import { CreateUserInput } from '../schema/User.schema'

export const createUserHandler = async (
    req: Request<{},{}, CreateUserInput["body"]>, 
    res: Response
    ) =>{
    try {
        const user = await createUser(req.body);
        return user;
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}