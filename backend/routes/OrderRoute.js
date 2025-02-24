import express from 'express';
import { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/auth.js';

const orderRouter = express.Router();

//admin routes
orderRouter.get('/list', adminAuth, getAllOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

//Payment routes
orderRouter.post('/cod', userAuth, placeOrderCOD);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

//User routes
orderRouter.get('/userOrders',userAuth, getUserOrders);

export default orderRouter;