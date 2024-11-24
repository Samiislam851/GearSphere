"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Zod schema for OrderInterface
exports.OrderSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').min(1, 'Email is required'),
    car: zod_1.z.instanceof(mongoose_1.Types.ObjectId).refine((val) => val instanceof mongoose_1.Types.ObjectId, {
        message: 'Car must be a valid ObjectId',
    }),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1').int(),
    totalPrice: zod_1.z.number().min(0, 'Total price must be a positive number'),
});
