import Joi from "joi";
import { Author } from "protocols";

export const platformSchema = Joi.object<Author>({
  author: Joi.string().required(),
});