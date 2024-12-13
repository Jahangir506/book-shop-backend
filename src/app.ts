import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import orderRouter from './modules/order/order.router';
import productRouter from './modules/product/product.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', async (req: Request, res: Response,) => {
  try {
    res.send('📖 Welcome to book shop. Come and buy books.');
  } catch (error) {
    res.status(404).json({
      message: 'Server Error',
      error,
    });
  }
});

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: 'Route is not found.',
    success: false,
  });
  next()
});

export default app;
