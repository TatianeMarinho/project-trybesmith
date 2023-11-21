import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { GetAllOrdersReturn } from '../types/GetAllOrders';
import { ReturnOrdersAll, Returns } from '../types/Returns';

async function getAllOrder(): Promise<Returns> {
  try {
    const orders = await OrderModel.findAll({
      include: [{
        model: ProductModel, as: 'productIds', attributes: ['id'],
      }],
    }) as GetAllOrdersReturn[];
    const formattedOrders: ReturnOrdersAll[] = orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      productIds: order.productIds.map((product) => product.id),
    }));
    return { status: 200, data: formattedOrders };
  } catch (error) {
    console.error(error);
    return { status: 500, data: 'Internal Server Error' };
  }
}

export default {
  getAllOrder,
};