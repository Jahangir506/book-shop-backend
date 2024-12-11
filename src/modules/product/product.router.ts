import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.post('/create-product', productController.createProduct)

productRouter.get('/', productController.getAllProduct);

productRouter.get('/:productId', productController.getSingleProduct)

productRouter.put('/:productId', productController.updateProduct)

export default productRouter;