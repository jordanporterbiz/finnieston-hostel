import mongoose from 'mongoose';
import Product, { IProduct } from '../models/Product.model';

// // Connect to the MongoDB database
// mongoose.connect(process.env.MONGODB_URI as string);





// // Define the CRUD routes for products
// app.get('/products', async (req: Request, res: Response) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
