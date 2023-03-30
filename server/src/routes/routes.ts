import { Express, Request, Response } from 'express'
import { createUserHandler } from '../controllers/User.controller'
import {
    getProductsHandler,
    getProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
} from '../controllers/Product.controller'
import { productSchema } from '../schema/Product.schema'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/User.schema'

function routes(app: Express) {
    // Health Check
    app.get('/health', (req: Request, res: Response) => res.sendStatus(200))

    // User routes
    app.post(
        '/api/users',
        validateResource(createUserSchema),
        createUserHandler
    )

    // Session routes
    // app.post('/sessions', createSessionHandler)
    // app.delete('/sessions', deleteSessionHandler)
    // app.get('/sessions', getSessionHandler)
    // app.get('/sessions/:id', getSessionByIdHandler)

    // Booking routes
    // app.get('/api/bookings', getBookingsHandler)
    // app.get('/api/bookings/:id', getBookingByIdHandler)
    // app.post('/api/bookings', createBookingHandler)
    // app.put('/api/bookings/:id', updateBookingHandler)
    // app.delete('/api/bookings/:id', deleteBookingHandler)

    // Product routes
    app.get('/api/products', getProductsHandler)
    app.get('/api/products/:id', getProductByIdHandler)
    app.post(
        '/api/products',
        validateResource(productSchema),
        createProductHandler
    )
    app.put('/api/products/:id', updateProductHandler)
    app.delete('/api/products/:id', deleteProductHandler)

    // Order routes
    // app.get('/api/orders', getOrdersHandler)
    // app.get('/api/orders/:id', getOrderByIdHandler)
    // app.post('/api/orders', createOrderHandler)
    // app.put('/api/orders/:id', updateOrderHandler)
    // app.delete('/api/orders/:id', deleteOrderHandler)
}

export default routes
