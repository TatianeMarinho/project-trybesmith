import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/', productController.createProduct);

productRouter.get('/', productController.allProducts);

export default productRouter;