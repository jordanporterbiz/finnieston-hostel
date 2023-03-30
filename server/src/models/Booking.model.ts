import mongoose, { Document, Schema } from 'mongoose';

export interface BookingDocument extends Document {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomType: string;
  roomNumber: string;
  price: number;
  paymentMethod: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  additionalServices?: string[];
  cancellationPolicy?: string;
  comments?: string;
}

export interface BookingInput {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    checkInDate: Date;
    checkOutDate: Date;
    roomType: string;
    roomNumber: string;
    price: number;
    paymentMethod: string;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    additionalServices?: string[];
}

const BookingSchema = new Schema<BookingDocument>({
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomType: { type: String, required: true },
  roomNumber: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['confirmed', 'pending', 'cancelled', 'completed'], required: true },
  additionalServices: [{ type: String }],
  cancellationPolicy: { type: String, required: true },
  comments: { type: String },
});

const BookingModel = mongoose.model<BookingDocument>('Booking', BookingSchema);

export default BookingModel;