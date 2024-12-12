import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.orderBook);
orderRouter.get('/revenue', orderController.totalPrice);

export default orderRouter;
