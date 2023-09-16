import { Router } from "express";
import * as booksController from "../controllers/books.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { bookSchema } from "../schemas/book.schema";

const booksRouter = Router();
booksRouter.get("/books", booksController.listBooks);
booksRouter.get("/books/:book", booksController.listByBooks);
booksRouter.post("/books", schemaValidation(bookSchema), booksController.createBook);
booksRouter.delete("/books/relation/:id", booksController.deleteBookRelation);
booksRouter.patch("/books/relation/:id", schemaValidation(bookSchema), booksController.editRelation);
export default booksRouter;