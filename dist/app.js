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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_router_1 = __importDefault(require("./modules/order/order.router"));
const product_router_1 = __importDefault(require("./modules/product/product.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_router_1.default);
app.use('/api/orders', order_router_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('📖 Welcome to book shops. Come and buy books.');
    }
    catch (error) {
        res.status(404).json({
            message: 'Server Error',
            error,
        });
    }
}));
app.all('*', (req, res) => {
    res.status(400).json({
        message: 'Route is not found.',
        success: false,
    });
});
exports.default = app;
