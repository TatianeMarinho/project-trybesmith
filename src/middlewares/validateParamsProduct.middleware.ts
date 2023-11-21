/* import { Response, Request, NextFunction } from 'express';
import { ReturnsMiddleware } from '../types/ReturnsMiddleware';

function validateParams(req: Request, res: Response, next: NextFunction):  {
  const { name, price, orderId } = req.body;
  let result = '';

  if (!name) {
    result = 'name is required';
  } else if (!price) {
    result = 'price is required'; 
  } else if (!orderId) {
    result = 'orderId is required'; 
  }

  if (result !== '') {
    const errorResponse = {
      message: result,
    };
    return res.status(400).json(errorResponse);
  }

  next();
}

export default validateParams;
 */