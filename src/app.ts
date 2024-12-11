import express from 'express';
import orderRouter from './modules/order/order.router';
import bookRouter from './modules/product/product.router';


const app = express()

//middleware
app.use(express.json());

// endPoint route
app.use('/api/products', bookRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('Hello Developments!')
})


export default app;