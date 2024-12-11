import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.post('/create-book', productController.createBook)

productRouter.get('/', productController.getAllBook);

productRouter.get('/:productId', productController.getSingleBook)

productRouter.put('/:productId', productController.updateBook)

productRouter.delete('/:productId', productController.deleteBook)

export default productRouter;