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

const getSingleProduct = async (req: Request, res: Response,) => {
    try {

        const productId = req.params.productId;

        const result = await productService.getSingleProduct(productId)

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

const updateProduct = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;
        const body = req.body;

        const result = await productService.updateProduct(productId, body)

        res.status(200).json({
            message: 'Product updated successfully',
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
    getSingleProduct,
    updateProduct
}