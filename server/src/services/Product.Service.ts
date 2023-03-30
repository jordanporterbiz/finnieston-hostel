import { omit } from 'lodash'
import ProductModel, { ProductInput } from '../models/Product.model'

export async function createProduct(input: ProductInput) {
    console.log(input)
    try {
        return await ProductModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getProducts() {
    try {
        return await ProductModel.find()
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function getProductById(id: string) {
    try {
        const product = await ProductModel.findById(id)
        return product
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function updateProduct(id: string, input: ProductInput) {
    try {
        const product = await ProductModel.findByIdAndUpdate(id, input, {
            new: true,
        })
        return product
    } catch (e: any) {
        throw new Error(e)
    }
}

export async function deleteProduct(id: string) {
    try {
        const product = await ProductModel.findByIdAndDelete(id)
        return product
    } catch (e: any) {
        throw new Error(e)
    }
}
