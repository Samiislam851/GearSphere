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
exports.calculateRevenue = exports.createOrder = void 0;
const car_model_1 = require("../car/car.model");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.Car.findById(data.car);
    if (!car || car.quantity < data.quantity) {
        throw new Error('Insufficient stock');
    }
    car.quantity -= data.quantity;
    if (car.quantity === 0) {
        car.inStock = false;
    }
    yield car.save();
    return yield order_model_1.default.create(data);
});
exports.createOrder = createOrder;
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orders = yield order_model_1.default.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    return ((_a = orders[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.calculateRevenue = calculateRevenue;
