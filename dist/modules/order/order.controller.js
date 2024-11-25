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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedRes = order_validation_1.OrderSchema.parse(req.body);
        console.log('🚀 ~ createOrder ~ validatedRes:', validatedRes);
        const order = yield order_service_1.orderService.createOrder(req.body);
        res.status(201).json({
            message: 'Order created successfully',
            success: true,
            data: order,
        });
    }
    catch (error) {
        const err = error;
        next(err);
    }
});
const calculateRevenue = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.orderService.calculateRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue: revenue },
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: 'Failed to calculate revenue',
            success: false,
            error: err.message,
        });
    }
});
exports.orderController = {
    createOrder,
    calculateRevenue,
};
