"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_route_1 = __importDefault(require("./modules/car/car.route"));
const zod_1 = require("zod");
const order_route_1 = __importDefault(require("./modules/order/order.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/cars', car_route_1.default);
app.use('/api/orders', order_route_1.default);
app.get('/', (req, res) => {
    res.send("Hello i'm alive");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: 'Validation error',
            error: err.issues,
            stack: err.stack
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
            error: err,
            stack: err.stack
        });
    }
});
exports.default = app;
