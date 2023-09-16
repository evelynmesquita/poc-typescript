import { RequestAuthor } from "@/protocols";
import db from "@/database/database.connection"

export function listAuthor(author: string) {
  let query: string = `SELECT * FROM authors`;
  const params: string[] = [];
  if (author) {
    query += ` WHERE name ILIKE $1`;
    params.push(author);
  }
  query += `;`;
  const result = db.query<RequestAuthor>(query, params);
  return result;
}

export function createAuthor(author: string) {
  db.query(
    `INSERT INTO authors (name) 
    VALUES ($1);`,
    [author]
  );
  return;
}