import BookingModel, { BookingInput } from '../models/Booking.model'

export async function createBooking(input: BookingInput) {
    console.log(input)
    try {
        return await BookingModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getBookings() {
    try {
        return await BookingModel.find()
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getBookingById(id: string) {
    try {
        const booking = await BookingModel.findById(id)
        return booking
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function updateBooking(id: string, input: BookingInput) {
    try {
        const booking = await BookingModel.findByIdAndUpdate(id, input, {
            new: true,
        })
        return booking
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function deleteBooking(id: string) {
    try {
        const booking = await BookingModel.findByIdAndDelete(id)
        return booking
    } catch (e: any) {
        throw new Error(e)
    }
}
