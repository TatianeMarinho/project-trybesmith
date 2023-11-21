import { NextFunction, Request, Response } from 'express';
import { Host } from '../types/Login';
import jwtUtil from '../util/jwt.util';
import UserModel from '../database/models/user.model';

async function auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token obrigatorio' });
  }

  try {
    const decoded = jwtUtil.verify(authorization) as Host;
    const host = await UserModel.findOne({ where: { username: decoded.username } });
    if (!host) return res.status(401).json({ message: 'Token inválido' });
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default auth;