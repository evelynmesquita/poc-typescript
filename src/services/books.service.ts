import * as booksRepository from "../repositories/books.repository";
import * as authorsRepository from "../repositories/authors.repository";
import * as errors from "../errors/errors";
import { ServerResponse } from "protocols";

export async function listBooks() {
    const book: undefined = undefined;
    const author: undefined = undefined;
    const books = await booksRepository.listBooks(book, author);
    return books.rows;
}

export async function createBook(book: string, author: string) {
    //1st rule => Game cannot be created if the platform doesn't exist
    const authorExists = await authorsRepository.listAuthor(author);
    if (!authorExists.rowCount) throw errors.notFoundError("Author");
    const authorId: number = authorExists.rows[0].id;

    //2nd rule => Only one game per platform can exist
    const bookAuthorRelation = await booksRepository.listBooks(book, author);
    if (bookAuthorRelation.rowCount)
        throw errors.conflictError("Book for Author");

    const bookInDB = await booksRepository.findBookByName(book);
    if (bookInDB.rowCount) {
        const bookId = bookInDB.rows[0].id;
        await booksRepository.createBookById(bookId, authorId);
    } else {
        await booksRepository.createBook(book, authorId);
    }
}

export async function deleteBookRelation(id: number) {
    const relationExists: ServerResponse = await booksRepository.findRelation(id);
    if (!relationExists.rowCount) throw errors.notFoundError("Relation");

    await booksRepository.deleteRelation(id);
}

export async function listByBooks(name: string) {
    const list: ServerResponse = await booksRepository.listByBooks(name);
    return list.rows;
}

export async function editRelation(book: string, author: string, id: number) {
    //1st rule => The relation must exist
    const relationExists: ServerResponse = await booksRepository.findRelation(id);
    const { book: bookFound } = relationExists.rows[0];
    if (book !== bookFound)
        throw errors.unauthorized(`Book is not on relation id`);

    const bookAuthorRelation: ServerResponse = await booksRepository.listBooks(
        book,
        author
    );
    if (bookAuthorRelation.rowCount)
        throw errors.conflictError("Book for Author");
    //3rd rule => The platform must already exist in the db
    const authorExists = await authorsRepository.listAuthor(author);
    if (!authorExists.rowCount) throw errors.notFoundError("Author");
    const authorId: number = authorExists.rows[0].id;

    await booksRepository.editRelation(id, authorId);
}