import { NextFunction, Request, Response } from "express";
import { productService } from "./product.service";
import productValidationSchema from "./product.validation";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const product = req.body;

        // data validation use to zod 
        const zodParseData = productValidationSchema.parse(product)

        const result = await productService.createBook(zodParseData)

        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const getAllBook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await productService.getAllBook()

        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const productId = req.params.productId;

        const result = await productService.getSingleBook(productId)

        res.status(200).json({
            message: 'Book retrieved successfully',
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error)
    }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const productId = req.params.productId;

        await productService.deleteBook(productId)

        res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            data: {}
        })
    } catch (error) {
        next(error)
    }
};

export const productController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
}