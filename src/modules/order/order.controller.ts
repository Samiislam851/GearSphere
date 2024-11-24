import { Request, Response } from 'express';
import * as orderService from './order.services';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ message: 'Order created successfully', success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', success: false, error: error.message });
  }
};

export const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const revenue = await orderService.calculateRevenue();
    res.status(200).json({ message: 'Revenue calculated successfully', success: true, data: { totalRevenue: revenue } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate revenue', success: false, error: error.message });
  }
};
