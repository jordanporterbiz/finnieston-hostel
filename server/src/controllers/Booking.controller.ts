import { Request, Response } from 'express'
import logger from '../utils/logger'
import {
    createBooking,
    getBookingById,
    getBookings,
    deleteBooking,
    updateBooking,
} from '../services/Booking.service'
//import { BookingSchema } from '../schema/Booking.schema'

// app.get('/api/bookings', getBookingsHandler)
// app.get('/api/bookings/:id', getBookingByIdHandler)
// app.post('/api/bookings', createBookingHandler)
// app.put('/api/bookings/:id', updateBookingHandler)
// app.delete('/api/bookings/:id', deleteBookingHandler)

export const getBookingsHandler = async (req: Request, res: Response) => {
    try {
        const bookings = await getBookings()
        return res.send(bookings)
    } catch (e: any) {
        logger.error(e)
        return res.status(400).send(e.message)
    }
}

export const getBookingByIdHandler = async (req: Request, res: Response) => {
    try {
        const booking = await getBookingById(req.body)
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' })
        }
        return res.send(booking.toJSON())
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

export const createBookingHandler = async (req: Request, res: Response) => {
    try {
        const booking = await createBooking(req.body)
        return res.send(booking.toJSON())
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

export const deleteBookingHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const booking = await deleteBooking(req.body)
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' })
        return res.statusCode === 200
            ? res.send('Booking deleted')
            : res.send('Booking not deleted')
    } catch (e: any) {
        logger.error(e)
        return res.status(500).send(e.message)
    }
}

export const updateBookingHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedBooking = await updateBooking(id, req.body)
        if (!updatedBooking)
            return res.status(404).json({ message: 'Booking not found' })
        return res.send(updatedBooking.toJSON())
    } catch (e: any) {
        logger.error(e)
        return res.status(400).send(e.message)
    }
}
