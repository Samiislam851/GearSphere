import { Car } from '../car/car.model';
import { OrderInterface } from './order.interface';
import Order from './order.model';

const createOrder = async (data: OrderInterface) => {
  const car = await Car.findById(data.car);

  if (!car) {
    throw new Error("Car doesn't exist");
  }

  if (!car.inStock) {
    throw new Error('Car is currently out of stock');
  }

  if (car.quantity < data.quantity) {
    throw new Error('Insufficient stock');
  }

  if (data.quantity <= 0) {
    throw new Error('Quantity must be greater than zero');
  }

  car.quantity -= data.quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }

  try {
    await car.save();
    const order = await Order.create(data);
    return order;
  } catch (err) {
    const error = err as Error;
    car.quantity += data.quantity;
    car.inStock = true;
    await car.save();
    throw new Error(`Order creation failed: ${error.message}`);
  }
};

const calculateRevenue = async () => {
  const orders = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
  return orders[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
