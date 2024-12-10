import { NextFunction, Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        const result = await productService.createProduct(payload)

        res.status(200).json({
            message: 'Product created successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await productService.getAllProduct()

        res.status(200).json({
            message: 'Products retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const getSpecificProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await productService.getSpecificProduct()

        res.status(200).json({
            message: 'Product retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};


export const productController = {
    createProduct,
    getAllProduct,
    getSpecificProduct
}