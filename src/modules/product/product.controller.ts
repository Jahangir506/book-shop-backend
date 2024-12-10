import { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response,) => {
    try {
        const payload = req.body;

        const result = await productService.createProduct(payload)

        res.status(200).json({
            message: 'Product created successfully',
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: 'Something went wrong with the product. Please try again',
            success: false,
            error: error,
            "stack": "path"
        })
    }
};

const getAllProduct = async (req: Request, res: Response) => {
    try {

        const result = await productService.getAllProduct()

        res.status(200).json({
            message: 'Products retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: 'Something went wrong with the product. Please try again',
            success: false,
            error: error,
            "stack": "path"
        })
    }
};

const getSpecificProduct = async (req: Request, res: Response,) => {
    try {

        const productId = req.params.productId;

        const result = await productService.getSpecificProduct(productId)

        res.status(200).json({
            message: 'Product retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: 'Something went wrong with the product. Please try again',
            success: false,
            error: error,
            "stack": "path"
        })
    }
};


export const productController = {
    createProduct,
    getAllProduct,
    getSpecificProduct
}