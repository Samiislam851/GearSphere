"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidationSchema = void 0;
const zod_1 = require("zod");
const car_interface_1 = require("./car.interface");
const carCategories = Object.values(car_interface_1.CarCategory);
exports.carValidationSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    year: zod_1.z.number().int().min(1886, "Year must be valid").max(new Date().getFullYear() + 1, "Year cannot be in the distant future"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.enum(carCategories).refine(value => carCategories.includes(value), {
        message: "Category must be a valid CarCategory",
    }),
    description: zod_1.z.string().min(1, "Description is required"),
    quantity: zod_1.z.number().int().nonnegative("Quantity must be a non-negative integer"),
    inStock: zod_1.z.boolean(),
});
