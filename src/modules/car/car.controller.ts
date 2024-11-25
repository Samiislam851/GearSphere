import { NextFunction, Request, Response } from 'express';
import { carService } from './car.service';
import { carValidationSchema } from './car.validation';

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationRes = carValidationSchema.parse(req.body);
    const car = await carService.createCar(validationRes);
    res
      .status(201)
      .json({ message: 'Car created successfully', success: true, data: car });
  } catch (error) {
    const err = error as Error;
    next(err);
  }
};

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cars = await carService.getAllCars(req.query.searchTerm as string);
    if (cars.length === 0) {
      res.status(404).json({
        success: false,
        message: `No cars found matching ${req.query.searchTerm}`,
      });
    } else {
      res.status(200).json({
        message: 'Cars retrieved successfully',
        success: true,
        data: cars,
      });
    }
  } catch (error) {
    const err = error as Error;
    next(err);
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await carService.getCarById(req.params.carId);
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: car,
    });
  } catch (error) {
    const err = error as Error;
    res.status(404).json({
      message: 'Car not found',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const validatedRes = carValidationSchema.partial().parse(req.body);
    const updatedCar = await carService.updateCar(
      req.params.carId,
      validatedRes,
    );
    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      data: updatedCar,
    });
  } catch (error) {
    const err = error as Error;
    res.status(404).json({
      message: 'Car not found',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    await carService.deleteCar(req.params.carId);
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Failed to delete car',
      success: false,
      error: err.message,
    });
  }
};

export const carController = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
