import express, { NextFunction, Request, Response } from 'express';
import orderRouter from './modules/order/order.router';
import productRouter from './modules/product/product.router';

const app = express()

//middleware
app.use(express.json());

// endPoint route
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Developer!')
})

app.all('*', (req: Request, res: Response) => {
    res.status(400).json({
        message: 'Route is not found, please check the URL and try again.',
        success: false,
    })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(200).json({
            message: 'Something went wrong with the book. Please try again',
            success: false,
            error: error,
            stack: 'path'
        })
    }
})

export default app;