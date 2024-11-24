import { z } from 'zod';
import { Types } from 'mongoose';

// Zod schema for OrderInterface
export const OrderSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  car: z.instanceof(Types.ObjectId).refine((val) => val instanceof Types.ObjectId, {
    message: 'Car must be a valid ObjectId',
  }),
  quantity: z.number().min(1, 'Quantity must be at least 1').int(),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});



