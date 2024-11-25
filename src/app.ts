import cors from 'cors';
import express, { Request, Response } from 'express';
import { ZodError } from 'zod';
import carRouter from './modules/car/car.route';
import orderRouter from './modules/order/order.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/cars', carRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send("Hello i'm alive");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: err.issues,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: err,
      stack: err.stack,
    });
  }
});

export default app;
