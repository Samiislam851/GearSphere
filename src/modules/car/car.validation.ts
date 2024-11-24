import { z } from "zod";
import { CarCategory } from "./car.interface";
const carCategories = Object.values(CarCategory) as [CarCategory, ...CarCategory[]];


export const carValidationSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z.number().int().min(1886, "Year must be valid").max(new Date().getFullYear() + 1, "Year cannot be in the distant future"),
    price: z.number().positive("Price must be a positive number"),
    category: z.enum(carCategories).refine(value => carCategories.includes(value), {
        message: "Category must be a valid CarCategory",
      }),
    description: z.string().min(1, "Description is required"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    inStock: z.boolean(),
  });