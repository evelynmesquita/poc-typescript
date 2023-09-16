import { Request, Response } from "express";
import httpStatus from "http-status";
import * as authorServices from "@/services/authors.service";


export async function listAuthors(req: Request, res: Response) {
    const list = await authorServices.listAuthor();
    res.status(httpStatus.OK).send(list);
}

export async function newAuthor(req: Request, res: Response) {
    const author: string = req.body.author;
    await authorServices.createAuthor(author);
    res.status(httpStatus.CREATED).send("Author was registred");
}