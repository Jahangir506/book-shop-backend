/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Product from '../product/product.model';
import Order from './order.model';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const orderBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);

    const { email, product, quantity, totalPrice } = zodParseData;

    const productDoc = await Product.findById(product)

    if (!productDoc) {
      return res.status(404).json({
        message: "Prodcut not found"
      })
    }

    if (productDoc.quantity < quantity) {
      return res.status(404).json({
        message: "Product is out of stock"
      })
    }

    productDoc.quantity -= quantity
    if (productDoc.quantity === 0) {
      productDoc.inStock = false;
    }


    await productDoc.save()

    const newOrder = await Order.create({
      email,
      product: productDoc._id,
      quantity,
      totalPrice
    })



    const orderData = await orderService.orderBook(newOrder);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: orderData,
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

const orderTotalPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await orderService.orderTotalPrice();

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
  orderBook,
  orderTotalPrice,
};
