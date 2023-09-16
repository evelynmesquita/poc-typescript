import { Router } from "express";
//import * as authorsController from "../controllers/authors.controller";
import schemaValidation from "../middlewares/schemaValidation.middleware";
import { authorSchema } from "../schemas/author.schema";

const platformsRouter = Router();
platformsRouter.get("/platforms");
platformsRouter.post(
  "/platforms",
  schemaValidation(authorSchema)
);

export default platformsRouter;