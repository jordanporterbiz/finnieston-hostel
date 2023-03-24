import { Request, Response} from 'express'
import logger from '../utils/logger'
export  const createUserHandler = (req: Request, res: Response) =>{

    try {
       // const user = await // Call User service.
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
        
    }
}