import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number;
  username: string;
};

type TokenReturn = {
  token: string;
};

function sign(payload: TokenPayload): TokenReturn {
  const token = jwt.sign(payload, secret);
  return { token };
}

function verify(token: string): TokenPayload {
  const decoded = jwt.verify(token, secret) as TokenPayload;
  return decoded;
}

export default {
  sign,
  verify,
};