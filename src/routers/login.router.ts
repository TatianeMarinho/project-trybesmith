import express from 'express';
import loginController from '../controllers/login.controller';
import validateParams from '../middlewares/validateParamsLogin';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  validateParams,
  loginController.login,
);

export default loginRouter;