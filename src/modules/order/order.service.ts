import { Car } from '../car/car.model';
import Order from './order.model';

export const createOrder = async (data: any) => {
  const car = await Car.findById(data.car);

  if (!car || car.quantity < data.quantity) {
    throw new Error('Insufficient stock');
  }

  car.quantity -= data.quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();

  return await Order.create(data);
};

export const calculateRevenue = async () => {
  const orders = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
  return orders[0]?.totalRevenue || 0;
};
