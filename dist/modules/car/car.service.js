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
exports.carService = void 0;
const car_model_1 = require("./car.model");
const createCar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.create(data);
});
const getAllCars = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = searchTerm ? { $or: [{ brand: searchTerm }, { model: searchTerm }, { category: searchTerm }] } : {};
    return yield car_model_1.Car.find(filter);
});
const getCarById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findById(carId);
});
const updateCar = (carId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findByIdAndUpdate(carId, data, { new: true });
});
const deleteCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield car_model_1.Car.findByIdAndDelete(carId);
});
exports.carService = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
};
