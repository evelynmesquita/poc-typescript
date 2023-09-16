import Joi from "joi";
import { Author } from "protocols";

export const authorSchema = Joi.object<Author>({
  author: Joi.string().required(),
});