import { Response, Request, NextFunction } from 'express';

type ResultObject = { status: number, data: { message: string } };
type ResultType = string | ResultObject;

function validateName(req: Request, res: Response, next: NextFunction): Response | void {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  } 
  
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  } 
  
  if (name.length < 2) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }

  next();
}

function validatePrice(req: Request, res: Response, next: NextFunction): Response | void {
  const { price } = req.body;
  let result: ResultType = '';
  
  if (!price) {
    result = { status: 400, data: { message: '"price" is required' } };
  } 
  
  if (typeof price !== 'string') {
    result = { status: 422, data: { message: '"price" must be a string' } };
  }
  
  if (price.length < 2) {
    result = { status: 422,
      data: { message: '"price" length must be at least 3 characters long' } };
  }
  
  if (result !== '') {
    return res.status(400).json({ message: result });
  }
  next();
}

export default {
  validateName,
  validatePrice,
};