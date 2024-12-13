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
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const orderBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const zodParseData = order_validation_1.default.parse(order);
        const orderData = yield order_service_1.orderService.orderBook(zodParseData);
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
            error: error,
            stack: 'path',
        });
    }
});
const totalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderService.totalPrice();
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
            error: error,
            stack: 'path',
        });
    }
});
exports.orderController = {
    orderBook,
    totalPrice,
};
