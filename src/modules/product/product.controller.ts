import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = req.body;

    const zodParseData = productValidationSchema.parse(product);

    const result = await productService.createBook(zodParseData);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};


const getAllBook = async (req: Request, res: Response): Promise<void> => {
  try {

    const searchTerm = req.query.searchTerm || '';

    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    const result = await productService.getAllBook(query);

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;

    const result = await productService.getSingleBook(productId);

    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const body = req.body;

    const result = await productService.updateBook(productId, body);

    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;

    await productService.deleteBook(productId);

    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(200).json({
      message: 'ValidationError',
      success: false,
      error: error,
      stack: 'path',
    });
  }
};

export const productController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
