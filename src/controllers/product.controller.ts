import { NextFunction, Request, Response } from 'express';
import productService from '../services/product.service';

async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { body } = req;

    const { status, data } = await productService.registration(body);

    return res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

async function allProducts(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { status, data } = await productService.getAllProducts();

    return res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export default {
  createProduct,
  allProducts,
};