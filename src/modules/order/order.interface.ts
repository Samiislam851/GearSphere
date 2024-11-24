import { Types } from 'mongoose';

export interface OrderInterface {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}