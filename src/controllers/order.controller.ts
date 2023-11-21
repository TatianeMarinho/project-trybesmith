import { NextFunction, Response, Request } from 'express';
import orderService from '../services/order.service';

async function allOrders(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const { status, data } = await orderService.getAllOrder();
  
    return res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export default {
  allOrders,
};