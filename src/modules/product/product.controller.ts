import { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const result = await productService.createProduct(payload)

        res.status(200).json({
            message: 'Product created successfully',
            success: true,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error,
        })
    }
};


export const productController = {
    createProduct,
}