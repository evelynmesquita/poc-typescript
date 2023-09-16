import { Request, Response } from "express";
import * as booksServices from "@/services/books.service";
import * as errors from "@/errors/errors";
import httpStatus from "http-status";
import { BookAuthor } from "protocols";

export async function listBooks(req: Request, res: Response) {
    const list = await booksServices.listBooks();
    res.status(httpStatus.OK).send(list);
}

export async function createBook(req: Request, res: Response) {
    const { book, author }: BookAuthor = req.body;
    await booksServices.createBook(book, author);
    res
        .status(httpStatus.CREATED)
        .send("The book has been added to the database");
}

export async function deleteBookRelation(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw errors.unprocessableEntity(req.params.id);
    await booksServices.deleteBookRelation(id);
    res.sendStatus(httpStatus.NO_CONTENT);
}

export async function listByBooks(req: Request, res: Response) {
    const book: string = req.params.book;
    if (!book || book === "") throw errors.unprocessableEntity(book);
    const list = await booksServices.listByBooks(book);
    res.status(httpStatus.OK).send(list);
}

export async function editRelation(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) throw errors.unprocessableEntity(req.params.id);
    const { book, author }: BookAuthor = req.body;
    await booksServices.editRelation(book, author, id);

    res.sendStatus(httpStatus.OK);
}