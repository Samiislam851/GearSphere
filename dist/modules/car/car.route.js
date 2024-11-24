"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const carRouter = express_1.default.Router();
carRouter.post('/', car_controller_1.carController.createCar);
carRouter.get('/', car_controller_1.carController.getAllCars);
carRouter.get('/:carId', car_controller_1.carController.getCarById);
carRouter.put('/:carId', car_controller_1.carController.updateCar);
carRouter.delete('/:carId', car_controller_1.carController.deleteCar);
exports.default = carRouter;
