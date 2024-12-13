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
exports.orderService = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const orderBook = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity, totalPrice } = order;
    const productDoc = yield product_model_1.default.findById(product);
    if (!productDoc) {
        throw new Error('Product not found');
    }
    if (productDoc.quantity < quantity) {
        throw new Error('Product is out of stock');
    }
    productDoc.quantity -= quantity;
    productDoc.inStock = productDoc.quantity > 0;
    yield productDoc.save();
    const newOrder = yield order_model_1.default.create({
        email,
        product: productDoc._id,
        quantity,
        totalPrice,
    });
    return newOrder;
});
const totalPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return result;
});
exports.orderService = {
    orderBook,
    totalPrice,
};
