import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import orderRouter from './modules/order/order.router';
import productRouter from './modules/product/product.router';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors())

// endPoint route
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('📖 Welcome to book shops. Come and buy books.');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'Route is not found.',
    success: false,
  });
});

export default app;
