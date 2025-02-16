import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing orders using COD
const placeOrderCOD = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: 'Order placed successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
}

//place order using stripe
const placeOrderStripe = async (req, res) => {
}

//place order using razorpay
const placeOrderRazorpay = async (req, res) => {
}

//get all orders
const getAllOrders = async (req, res) => {
}

//user orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
}

//update order status  (only admin)
const updateOrderStatus = async (req, res) => {
}

export { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, getAllOrders, getUserOrders, updateOrderStatus };