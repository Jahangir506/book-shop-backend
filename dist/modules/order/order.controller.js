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
const orderBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const zodParseData = order_validation_1.default.parse(order);
        const { email, product, quantity, totalPrice } = zodParseData;
        const productDoc = yield product_model_1.default.findById(product);
        if (!productDoc) {
            return res.status(404).json({
                message: "Prodcut not found"
            });
        }
        if (productDoc.quantity < quantity) {
            return res.status(404).json({
                message: "Product is out of stock"
            });
        }
        productDoc.quantity -= quantity;
        if (productDoc.quantity === 0) {
            productDoc.inStock = false;
        }
        yield productDoc.save();
        const newOrder = yield order_model_1.default.create({
            email,
            product: productDoc._id,
            quantity,
            totalPrice
        });
        const orderData = yield order_service_1.orderService.orderBook(newOrder);
        res.status(200).json({
            message: 'Order created successfully',
            success: true,
            data: orderData,
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
const orderTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    orderBook,
    orderTotalPrice,
};
