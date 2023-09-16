import { Router } from "express";
//import * as booksController from "../controllers/books.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { bookSchema } from "../schemas/book.schema";

const gamesRouter = Router();
gamesRouter.get("/books");
gamesRouter.post(
    "/books",
    schemaValidation(bookSchema),
);
gamesRouter.delete("/books/relation/:id");
gamesRouter.patch(
    "/books/relation/:id",
    schemaValidation(bookSchema)
);

export default gamesRouter;