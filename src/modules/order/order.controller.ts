import { Request, Response } from 'express';
import Product from '../product/product.model';
import Order from './order.model';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrderBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderBookData = req.body;
    const zodParseData = orderValidationSchema.parse(orderBookData);

    const { email, product, quantity, totalPrice } = zodParseData;

    const orderBook = await Product.findById(product)

    if (!orderBook) {
      res.status(404).json({
        message: "Prodcut not found"
      })
      return
    }

    if (orderBook.quantity < quantity) {
      res.status(404).json({
        message: "Product is out of stock"
      })
      return
    }

    orderBook.quantity -= quantity
    if (orderBook.quantity === 0) {
      orderBook.inStock = false;
    }

    await orderBook.save()

    const updateOrder = await Order.create({
      email,
      product: orderBook._id,
      quantity,
      totalPrice
    })

    const allOrderBook = await orderService.createOrderBook(updateOrder);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: allOrderBook,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error,
      stack: 'path',
    });
  }
};

const orderTotalRevenuePrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderService.orderTotalRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfull',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error,
      stack: 'path',
    });
  }
};

export const orderController = {
  createOrderBook,
  orderTotalRevenuePrice,
};
