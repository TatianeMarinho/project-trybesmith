import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateParamsProducts from '../middlewares/validateParamsProducts';

const productRouter = Router();

productRouter.post(
  '/',
  validateParamsProducts.validateName,
  validateParamsProducts.validatePrice,
  productController.createProduct,
);

productRouter.get('/', productController.allProducts);

export default productRouter;