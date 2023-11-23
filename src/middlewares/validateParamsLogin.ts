import { Response, Request, NextFunction } from 'express';

function validateParams(req: Request, res: Response, next: NextFunction): Response | void {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  } 
  next();
}

export default validateParams;