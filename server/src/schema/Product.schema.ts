import { object, string, number, union, array, boolean, literal } from 'zod'

export const productSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        description: string({
            required_error: 'Description is required',
        }),
        price: number({
            required_error: 'Price is required',
        }),
        availability: union(
            [boolean(), literal('in stock'), literal('out of stock')],
            {
                required_error: 'Availability is required',
            }
        ),
        productCode: string({
            required_error: 'Product Code is required',
        }),
        manufacturer: string({
            required_error: 'Manufacturer is required',
        }),
        category: union([string(), array(string())], {
            required_error: 'Category is required',
        }),
        tags: union([string(), array(string())]),
        images: union([string(), array(string())]),
        reviews: array(object({ rating: number(), comment: string() })),
    }),
})
