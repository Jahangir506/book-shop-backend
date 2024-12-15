"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const zodParseData = product_validation_1.default.parse(product);
        const result = yield product_service_1.productService.createBook(zodParseData);
        res.status(200).json({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error: error,
            stack: 'path',
        });
    }
});
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm || '';
        const query = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        };
        const result = yield product_service_1.productService.getAllBook(query);
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error: error,
            stack: 'path',
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleBook(productId);
        res.status(200).json({
            message: 'Book retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error: error,
            stack: 'path',
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = yield product_service_1.productService.updateBook(productId, body);
        res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error: error,
            stack: 'path',
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.productService.deleteBook(productId);
        res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error: error,
            stack: 'path',
        });
    }
});
exports.productController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook,
};
