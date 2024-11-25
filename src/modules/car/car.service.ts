import { Types } from 'mongoose';
import { CarInterface } from './car.interface';
import { Car } from './car.model';

const createCar = async (data: CarInterface) => {
  const existingCar = await Car.findOne({
    brand: data.brand,
    model: data.model,
    year: data.year,
    price: data.price,
  });
  if (existingCar) {
    throw new Error('This car already exists');
  } else {
    return await Car.create(data);
  }
};

const getAllCars = async (searchTerm: string | undefined) => {
  const filter = searchTerm
    ? {
        $or: [
          { brand: searchTerm },
          { model: searchTerm },
          { category: searchTerm },
        ],
      }
    : {};
  return await Car.find(filter);
};

const getCarById = async (carId: string) => {
  const car = await Car.findById(carId);
  if (!car) {
    throw new Error('Car not found');
  }
  return car;
};

const updateCar = async (carId: string, data: Partial<CarInterface>) => {
  const result = await Car.updateOne(
    { _id: new Types.ObjectId(carId) },
    { $set: data },
    { new: true },
  );
  if (result.acknowledged) {
    return await getCarById(carId);
  }
  return result;
};

const deleteCar = async (carId: string) => {
  const car = await Car.findById(carId);
  if (!car) {
    throw new Error('Car not found');
  }
  return await Car.deleteOne({ _id: new Types.ObjectId(carId) });
};

export const carService = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
