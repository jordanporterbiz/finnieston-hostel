import { Express, Request, Response } from "express"
import { createUserHandler } from "../controllers/User.controller"
import validateResource from "../middleware/validateResource"
import { createUserSchema } from "../schema/User.schema"

function routes(app: Express) {

    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validateResource(createUserSchema), createUserHandler)



    // Product routes
    // app.get('/products', validateResource(productSchema) ,getProductsHandler)
    // app.get('/products/:id', getProductByIdHandler)
    // app.post('/products', createProductHandler)
    // app.patch('/products/:id', updateProductHandler)
    // app.delete('/products/:id', deleteProductHandler)

}

export default routes