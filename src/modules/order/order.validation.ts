import { z } from 'zod';

export const OrderSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  car: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1').int(),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});
