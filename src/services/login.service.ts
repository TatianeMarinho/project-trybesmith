import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { LoginResponse, UserParams } from '../types/Login';
import jwtUtil from '../util/jwt.util';

async function verifyLogin(user: UserParams): Promise<LoginResponse> {
  try {
    const host = await UserModel.findOne({ where: { username: user.username } });

    if (!host || !bcrypt.compareSync(user.password, host.dataValues.password)) {
      return { status: 401, data: { message: 'Username or password invalid' } };
    }
    const { id, username } = host.dataValues;
    const token = jwtUtil.sign({ id, username });
    return { status: 200, data: token };
  } catch (error) {
    console.error(error);
    return { status: 500, data: { message: 'Internal Server Error' } };
  }
}

export default {
  verifyLogin,
};