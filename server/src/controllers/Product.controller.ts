import { Request, Response} from 'express'
import logger from '../utils/logger'
import { createProduct, getProductById, getProducts, deleteProduct, updateProduct } from '../services/Product.service'
import { productSchema } from '../schema/Product.schema'


    // app.get('/products/:id', getProductByIdHandler)
    // app.post('/products', createProductHandler)
    // app.patch('/products/:id', updateProductHandler)
    // app.delete('/products/:id', deleteProductHandler)


export const getProductsHandler = async (
    req: Request, 
    res: Response
    ) =>{
    try {
        const products = await getProducts();
    } catch (e: any) {
        logger.error(e)
        return res.status(400).send(e.message)
    }
}

export const getProductByIdHandler = async (
    req: Request, 
    res: Response
    ) =>{
    try {
        const product = await getProductById(req.body);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.send(product.toJSON());
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}


export const createProductHandler = async (
    req: Request, 
    res: Response
    ) =>{
    try {
        const product = await createProduct(req.body);
        return res.send(product.toJSON());
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

export const deleteProductHandler = async (
    req: Request, 
    res: Response
    ) =>{
    try {
    const { id } = req.params;
    const product = await deleteProduct(req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });         
    return res.statusCode === 200 ? res.send('Product deleted') : res.send('Product not deleted')
    } catch (e: any) {
        logger.error(e)
        return res.status(500).send(e.message)
    }
}

export const updateProductHandler = async (
    req: Request, 
    res: Response
    ) =>{
    try {
        const { id } = req.params;
        const updatedProduct = await updateProduct(id, req.body);
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });         
        return res.send(updatedProduct.toJSON());
    } catch (e: any) {
        logger.error(e)
        return res.status(400).send(e.message)
    }
}

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/products', async (req, res) => {
//   const { name, price, description } = req.body;
//   const newProduct: IProduct = new Product({ name, price, description });
//   try {
//     const product = await newProduct.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.patch('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, price, description } = req.body;
//   try {
//     const product = await Product.findByIdAndUpdate(
//       id,
//       { name, price, description },
//       { new: true }
//     );
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
