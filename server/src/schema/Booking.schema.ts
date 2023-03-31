import * as z from 'zod'

// TODO: Refactor Booking Validation
export const BookingSchema = z.object({
    id: z.number(),
    guestName: z.string({
        required_error: 'Name is required',
    }).min(1),
    guestEmail: z.string({
        required_error: 'Email is required',
    }).email(),
    guestPhone: z.string({
        required_error: 'Phone number is required',
    }),
    checkInDate: z.date({
        required_error: 'Check-in date is required',
    }),
    checkOutDate: z.date({
        required_error: 'Check-out date is required',
    }),
    roomType: z.string({
        required_error: 'Room type is required',
    }).min(1),
    roomNumber: z.string().min(1),
    price: z.number({
        required_error: 'Price is required',
    }).min(0),
    paymentMethod: z.string({
        required_error: 'Payment method is required',
    }).min(1),
    status: z.enum(['confirmed', 'pending', 'cancelled', 'completed']),
    additionalServices: z.array(z.string().min(1)),
    cancellationPolicy: z.string().min(1),
    comments: z.string().optional(),
})

const exampleBooking = {
    id: 12345,
    guestName: 'John Doe',
    guestEmail: 'johndoe@example.com',
    guestPhone: '+1 555-123-4567',
    checkInDate: new Date('2023-04-01'),
    checkOutDate: new Date('2023-04-03'),
    roomType: 'dormitory',
    roomNumber: 'B2',
    price: 50,
    paymentMethod: 'credit card',
    status: 'confirmed',
    additionalServices: ['breakfast', 'laundry'],
    cancellationPolicy: '24 hours',
    comments: 'Please provide extra blankets',
}

const validatedBooking = BookingSchema.parse(exampleBooking)
