import { Request, Response } from "express";
import { orderService } from "./order.service";

const orderBook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await orderService.orderBook(payload)
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            error: error,
            stack: "path"
        })
    }
};

export const orderController = {
    orderBook
}
