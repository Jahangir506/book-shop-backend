import { Request, Response } from "express";
import { productService } from "./product.service";

const createBook = async (req: Request, res: Response,) => {
    try {
        const payload = req.body;

        const result = await productService.createBook(payload)

        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: result
        })
    } catch (error) {
        res.status(200).json({
            message: 'Something went wrong with the book. Please try again',
            success: false,
            error: error,
            "stack": "path"
        })
    }
};

const getAllBook = async (req: Request, res: Response) => {
    try {

        const result = await productService.getAllBook()

        res.status(200).json({
            message: 'Books retrieved successfully',
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

const getSingleBook = async (req: Request, res: Response,) => {
    try {

        const productId = req.params.productId;

        const result = await productService.getSingleBook(productId)

        res.status(200).json({
            message: 'Book retrieved successfully',
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

const updateBook = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;
        const body = req.body;

        const result = await productService.updateBook(productId, body)

        res.status(200).json({
            message: 'Book updated successfully',
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

const deleteBook = async (req: Request, res: Response) => {
    try {

        const productId = req.params.productId;

        await productService.deleteBook(productId)

        res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            data: {}
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
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
}