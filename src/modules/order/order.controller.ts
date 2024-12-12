import { NextFunction, Request, Response } from "express";
import Product from "../product/product.model";
import Order from "./order.model";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";

const orderBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;

    // zod
    const zodParseData = orderValidationSchema.parse(order)

    const { email, product, quantity, totalPrice } = zodParseData;

    const productDoc = await Product.findById(product);

    // check exists product
    if (!productDoc) {
      return res.status(404).json({
        success: false,
        error: "Product not found"
      });
    }

    // check stock
    if (productDoc.quantity < quantity) {
      return res.status(400).json({
        error: "Product is stock-out",
      });
    }

    // update product stock
    productDoc.quantity -= quantity;

    productDoc.inStock = productDoc.quantity > 0; // Automatically update inStock

    await productDoc.save();

    const newOrder = await Order.create({
      email,
      product: productDoc._id,
      quantity,
      totalPrice,
    });

    const orderData = await orderService.orderBook(newOrder)

    res.status(200).json({
      message: "Order created successfully",
      success: true,
      data: orderData
    });
  } catch (error) {
    next(error)
  }
};

const totalPrice = async (req: Request, res: Response, next: NextFunction) => {


  try {

    const [result] = await Order.aggregate([

      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json({
      message: 'Revenue calculated successfull',
      success: true,
      data: result
    });
  } catch (error) {
    next(error)
  }
};


export const orderController = {
  orderBook,
  totalPrice
}