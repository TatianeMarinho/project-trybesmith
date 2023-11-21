import { OrderSequelizeModel } from '../database/models/order.model';

// extends faz a nova interface criada(interface) ter todas as propriedades da model(OrderSequelizeModel) 
export interface GetAllOrdersReturn extends OrderSequelizeModel {
  id: number;
  userId: number;
  productIds: [{ id: number }];
}
