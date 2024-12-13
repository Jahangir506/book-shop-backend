import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const orderBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);
    const orderData = await orderService.orderBook(zodParseData);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: orderData,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

const totalPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderService.totalPrice();

    res.status(200).json({
      message: 'Revenue calculated successfull',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

export const orderController = {
  orderBook,
  totalPrice,
};
