import express from 'express';
import { userLoginController, userRegisterController, adminLoginController } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', userRegisterController);
userRouter.post('/login', userLoginController);
userRouter.post('/admin', adminLoginController);

export default userRouter;