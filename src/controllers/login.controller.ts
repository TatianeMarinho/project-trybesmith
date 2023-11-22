import { NextFunction, Request, Response } from 'express';
import loginService from '../services/login.service';

async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { body } = req;

  try {
    const { status, data } = await loginService.verifyLogin(body);
    return res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}
  
export default {
  login,
};