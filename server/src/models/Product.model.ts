import { Schema, model, Document } from 'mongoose'

export interface IProduct extends Document {
    name: string
    price: number
    description: string
    availability: string
    productCode: string
    manufacturer: string
    category: string[]
    tags: string[]
    images: string[]
    reviews: {
        rating: number
        comment: string
    }[]
}

export interface ProductInput {
    name: string
    price: number
    description: string
    availability: string
    productCode: string
    manufacturer: string
    category: string[]
    tags: string[]
    images: string[]
}

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        availability: { type: String, required: true },
        productCode: { type: String, required: true },
        manufacturer: { type: String, required: true },
        category: { type: [String], required: true },
        tags: { type: [String] },
        images: { type: [String] },
        reviews: [
            {
                rating: { type: Number },
                comment: { type: String },
            },
        ],
    },
    { timestamps: true }
)

export default model<IProduct>('Product', productSchema)
