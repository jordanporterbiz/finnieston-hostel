import { Request, Response} from 'express'
import logger from '../utils/logger'
import { createUser } from '../services/User.service'
import { CreateUserInput } from '../schema/User.schema'
import { omit } from 'lodash'

export const createUserHandler = async (
    req: Request<{},{}, CreateUserInput["body"]>, 
    res: Response
    ) =>{
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), 'password'));
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}