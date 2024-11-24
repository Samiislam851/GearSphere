import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

// Example route to trigger an error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    // Simulate an error
    next(new Error('Something went wrong!'));
  });
// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message); // Log the error (optional)
  
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });




// app.use('/api/');
app.get('/', (req :Request ,res: Response)=>{

    res.send("Hello i'm alive");
})


export default app;