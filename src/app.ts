import express from 'express';
import productRouter from './modules/product/product.router';

const app = express()

//middleware
app.use(express.json());


app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('Hello Developments!')
})

export default app;