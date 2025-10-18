import express from 'express'
import { getAllOrders, getUserOrders, placeCOD } from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authUser,placeCOD);
orderRouter.get('/user',authUser,getUserOrders);
orderRouter.get('/user',authSeller,getAllOrders);

export default orderRouter;

