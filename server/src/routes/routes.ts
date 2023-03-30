import { Express, Request, Response } from 'express'
import validateResource from '../middleware/validateResource'
import {
    getProductsHandler,
    getProductByIdHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
} from '../controllers/Product.controller'
import { productSchema } from '../schema/Product.schema'
import {
    getBookingsHandler,
    getBookingByIdHandler,
    createBookingHandler,
    updateBookingHandler,
    deleteBookingHandler,
} from '../controllers/Booking.controller'
import { BookingSchema } from '../schema/Booking.schema'
import { createUserHandler } from '../controllers/User.controller'
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
    app.get('/api/bookings', getBookingsHandler)
    app.get('/api/bookings/:id', getBookingByIdHandler)
    app.post('/api/bookings', createBookingHandler)
    app.put('/api/bookings/:id', updateBookingHandler)
    app.delete('/api/bookings/:id', deleteBookingHandler)

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

    // Payment routes
    // app.get('/api/payments', getPaymentsHandler)
    // app.get('/api/payments/:id', getPaymentByIdHandler)
    // app.post('/api/payments', createPaymentHandler)
    // app.put('/api/payments/:id', updatePaymentHandler)
    // app.delete('/api/payments/:id', deletePaymentHandler)

    // Invoice routes
    // app.get('/api/invoices', getInvoicesHandler)
    // app.get('/api/invoices/:id', getInvoiceByIdHandler)
    // app.post('/api/invoices', createInvoiceHandler)
    // app.put('/api/invoices/:id', updateInvoiceHandler)
    // app.delete('/api/invoices/:id', deleteInvoiceHandler)

}

export default routes
