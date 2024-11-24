import { NextFunction, Request, Response } from 'express';
import { orderService } from './order.service';
import { OrderSchema } from './order.validation';


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedRes = OrderSchema.parse(req.body);

        console.log("🚀 ~ createOrder ~ validatedRes:", validatedRes);

        const order = await orderService.createOrder(req.body);

        res.status(201).json({ message: 'Order created successfully', success: true, data: order });
    } catch (error) {
        const err = error as Error;
        next(err);
    }
};

const calculateRevenue = async (_req: Request, res: Response,) => {
    try {
        const revenue = await orderService.calculateRevenue();
        res.status(200).json({ message: 'Revenue calculated successfully', success: true, data: { totalRevenue: revenue } });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: 'Failed to calculate revenue', success: false, error: err.message });
    }
};
export const orderController = {
    createOrder,
    calculateRevenue
}