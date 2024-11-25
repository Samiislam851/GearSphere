import mongoose, { Model, Schema } from 'mongoose';
import { CarCategory, CarInterface } from './car.interface';

const carSchema = new Schema<CarInterface>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(CarCategory),
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const Car: Model<CarInterface> = mongoose.model<CarInterface>(
  'Car',
  carSchema,
);
