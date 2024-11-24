"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const zod_1 = require("zod");
exports.OrderSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').min(1, 'Email is required'),
    car: zod_1.z.string(),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1').int(),
    totalPrice: zod_1.z.number().min(0, 'Total price must be a positive number'),
});
