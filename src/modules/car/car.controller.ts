import { Request, Response } from 'express';
import { carService } from './car.service';
import { carValidationSchema } from './car.validation';


const createCar = async (req: Request, res: Response) => {
  try {
    const validationRes = carValidationSchema.parse(req.body)
    const car = await carService.createCar(validationRes);
    res.status(201).json({ message: 'Car created successfully', success: true, data: car });
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: 'Failed to create car', success: false, error: err.message });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars(req.query.searchTerm as string);
    res.status(200).json({ message: 'Cars retrieved successfully', success: true, data: cars });
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: 'Failed to retrieve cars', success: false, error: err.message });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await carService.getCarById(req.params.carId);
    res.status(200).json({ message: 'Car retrieved successfully', success: true, data: car });
  } catch (error) {
      const err = error as Error
    res.status(404).json({ message: 'Car not found', success: false, error: err.message });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const validatedRes = carValidationSchema.partial().parse(req.body);
    const updatedCar = await carService.updateCar(req.params.carId, validatedRes);
    res.status(200).json({ message: 'Car updated successfully', success: true, data: updatedCar });
  } catch (error) {
      const err = error as Error
    res.status(500).json({ message: 'Failed to update car', success: false, error: err.message });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    await carService.deleteCar(req.params.carId);
    res.status(200).json({ message: 'Car deleted successfully', success: true, data: {} });
  } catch (error) {
      const err = error as Error
    res.status(500).json({ message: 'Failed to delete car', success: false, error: err.message });
  }
};


export const carController = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}