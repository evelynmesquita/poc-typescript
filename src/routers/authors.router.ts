import { Router } from "express";
import * as authorController from "../controllers/authors.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { authorSchema } from "../schemas/author.schema";

const authorsRouter = Router();
authorsRouter.get("/authors", authorController.listAuthors);
authorsRouter.post("/authors", schemaValidation(authorSchema), authorController.newAuthor);

export default authorsRouter;