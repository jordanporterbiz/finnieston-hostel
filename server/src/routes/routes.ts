import { Express, Request, Response } from "express"
import { createUser } from "../services/User.Service"
import { createUserHandler } from "../controllers/User.controller"
import validateResource from "../middleware/validateResource"
import { createUserSchema } from "../schema/User.schema"

function routes(app: Express) {

    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validateResource(createUserSchema), createUserHandler)
}

export default routes