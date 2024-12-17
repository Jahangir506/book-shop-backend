import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', orderController.createOrderBook);

orderRouter.get('/revenue', orderController.orderTotalRevenuePrice);

export default orderRouter;
