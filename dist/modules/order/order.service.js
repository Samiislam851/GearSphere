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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const car_model_1 = require("../car/car.model");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(data.car);
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
        yield car.save();
        const order = yield order_model_1.default.create(data);
        return order;
    }
    catch (err) {
        const error = err;
        car.quantity += data.quantity;
        car.inStock = true;
        yield car.save();
        throw new Error(`Order creation failed: ${error.message}`);
    }
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orders = yield order_model_1.default.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    return ((_a = orders[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.orderService = {
    createOrder,
    calculateRevenue,
};
