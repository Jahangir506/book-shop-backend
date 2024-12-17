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
exports.orderController = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrderBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderBookData = req.body;
        const zodParseData = order_validation_1.default.parse(orderBookData);
        const { email, product, quantity, totalPrice } = zodParseData;
        const orderBook = yield product_model_1.default.findById(product);
        if (!orderBook) {
            res.status(404).json({
                message: "Prodcut not found"
            });
            return;
        }
        if (orderBook.quantity < quantity) {
            res.status(404).json({
                message: "Product is out of stock"
            });
            return;
        }
        orderBook.quantity -= quantity;
        if (orderBook.quantity === 0) {
            orderBook.inStock = false;
        }
        yield orderBook.save();
        const updateOrder = yield order_model_1.default.create({
            email,
            product: orderBook._id,
            quantity,
            totalPrice
        });
        const allOrderBook = yield order_service_1.orderService.orderBook(updateOrder);
        res.status(200).json({
            message: 'Order created successfully',
            success: true,
            data: allOrderBook,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error,
            stack: 'path',
        });
    }
});
const orderTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.orderTotalPrice();
        res.status(200).json({
            message: 'Revenue calculated successfull',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'ValidationError',
            success: false,
            error,
            stack: 'path',
        });
    }
});
exports.orderController = {
    createOrderBook,
    orderTotalRevenue,
};
