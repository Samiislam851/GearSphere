"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const car_service_1 = require("./car.service");
const car_validation_1 = require("./car.validation");
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationRes = car_validation_1.carValidationSchema.parse(req.body);
        const car = yield car_service_1.carService.createCar(validationRes);
        res
            .status(201)
            .json({ message: 'Car created successfully', success: true, data: car });
    }
    catch (error) {
        const err = error;
        next(err);
    }
});
const getAllCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield car_service_1.carService.getAllCars(req.query.searchTerm);
        if (cars.length === 0) {
            res.status(404).json({
                success: false,
                message: `No cars found matching ${req.query.searchTerm}`,
            });
        }
        else {
            res
                .status(200)
                .json({
                message: 'Cars retrieved successfully',
                success: true,
                data: cars,
            });
        }
    }
    catch (error) {
        const err = error;
        next(err);
    }
});
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_service_1.carService.getCarById(req.params.carId);
        res
            .status(200)
            .json({
            message: 'Car retrieved successfully',
            success: true,
            data: car,
        });
    }
    catch (error) {
        const err = error;
        res
            .status(404)
            .json({
            message: 'Car not found',
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
const updateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedRes = car_validation_1.carValidationSchema.partial().parse(req.body);
        const updatedCar = yield car_service_1.carService.updateCar(req.params.carId, validatedRes);
        res
            .status(200)
            .json({
            message: 'Car updated successfully',
            success: true,
            data: updatedCar,
        });
    }
    catch (error) {
        const err = error;
        next(err);
    }
});
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield car_service_1.carService.deleteCar(req.params.carId);
        res.status(200).json({
            message: 'Car deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: 'Failed to delete car',
            success: false,
            error: err.message,
        });
    }
});
exports.carController = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar,
};
