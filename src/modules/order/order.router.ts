import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.post('/order-book', orderController.orderBook)

export default orderRouter;