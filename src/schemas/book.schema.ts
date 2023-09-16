import Joi from "joi";
import { BookAuthor } from "protocols";

export const gameSchema = Joi.object<BookAuthor>({
  book: Joi.string().required(),
  author: Joi.string().required(),
});