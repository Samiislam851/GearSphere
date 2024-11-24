
import mongoose, { Schema, model } from 'mongoose';
import { OrderInterface } from './order.interface';

const orderSchema = new Schema<OrderInterface>({
  email: { type: String, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
},
{ timestamps: true });

const Order = model<OrderInterface>('Order', orderSchema);
export default Order;
