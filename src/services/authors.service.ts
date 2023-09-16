import * as authorsRepository from "@/repositories/authors.repository";
import * as errors from "../errors/errors";

export async function listAuthor() {
    const author: undefined = undefined;
    const result = await authorsRepository.listAuthor(author);
    const list = result.rows;
    return list;
}

export async function createAuthor(name: string) {
    //1st rule => only one platform can exist
    const authorExists = await authorsRepository.listAuthor(name);
    if (authorExists.rowCount) throw errors.conflictError("Author");
    await authorsRepository.createAuthor(name);
    return;
}