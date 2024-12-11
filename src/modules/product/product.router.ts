import { Router } from "express";
import { productController } from "./product.controller";

const bookRouter = Router();

bookRouter.post('/create-book', productController.createBook)

bookRouter.get('/', productController.getAllBook);

bookRouter.get('/:productId', productController.getSingleBook)

bookRouter.put('/:productId', productController.updateBook)

bookRouter.delete('/:productId', productController.deleteBook)

export default bookRouter;