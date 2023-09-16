import { Router } from "express";
import booksRouter from "./books.router";
import authorsRouter from "./authors.router";

const indexRouter = Router();
indexRouter.use(booksRouter);
indexRouter.use(authorsRouter);

export default indexRouter;