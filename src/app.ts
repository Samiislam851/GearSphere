import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());


app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    next(new Error('Something went wrong!'));
});


// app.use('/api/');
app.get('/', (req: Request, res: Response) => {
    res.send("Hello i'm alive");
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});





export default app;