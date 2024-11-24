import express from 'express';
import { createOrder, calculateRevenue } from './order.controller';

const orderRouter = express.Router();

orderRouter.post('/', createOrder); // Create an order
orderRouter.get('/revenue', calculateRevenue); // Calculate revenue

export default orderRouter;
