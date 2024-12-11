import { Request, Response } from "express";
import { orderService } from "./order.service";
import orderValidationSchema from "./order.validation";

const orderBook = async (req: Request, res: Response) => {
    try {
        const order = req.body;

        // use zod validation 
        const zodParseData = orderValidationSchema.parse(order)

        const result = await orderService.orderBook(zodParseData)
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "path"
        })
    }
};

export const orderController = {
    orderBook
}
