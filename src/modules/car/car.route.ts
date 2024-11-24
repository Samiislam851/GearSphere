import express from 'express';
import { carController } from './car.controller';

const carRouter = express.Router();

carRouter.post('/', carController.createCar); 
carRouter.get('/', carController.getAllCars); 
carRouter.get('/:carId', carController.getCarById); 
carRouter.put('/:carId', carController.updateCar); 
carRouter.delete('/:carId', carController.deleteCar);

export default carRouter;
