import ProductModel from '../database/models/product.model';
import { RegistrationProduct } from '../types/RegistrationProduct';
import { Returns } from '../types/Returns';

async function registration(product: RegistrationProduct): Promise<Returns> {
  try {
    const productRegister = await ProductModel.create(product);
    const { id, name, price } = productRegister.dataValues;

    return { status: 201, data: { id, name, price } };
  } catch (error) {
    console.error(error);
    return { status: 500, data: 'Internal Server Error' };
  }
}

export default {
  registration,
};