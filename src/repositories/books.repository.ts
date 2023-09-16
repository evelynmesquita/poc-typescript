import { FullRelation, RequestListing } from "@/protocols/index";
import db from "@/database/database.connection";

export async function listBooks(bookName: string, authorName: string) {
    let query: string = `
    SELECT 
      ba.id AS id,
      b.name AS book, 
      a.name AS author 
    FROM 
      book_author ba
    JOIN 
      book b ON ba.book_id = b.id
    JOIN 
      authors a ON ba.author_id = a.id
  `;
    const params: string[] = [];

    if (bookName || authorName) {
        query += ` WHERE`;
        if (bookName) {
            params.push(`%${bookName}%`);
            query += ` b.name ILIKE $${params.length}`;
        }
        if (bookName && authorName) {
            query += ` AND`;
        }
        if (authorName) {
            params.push(`%${authorName}%`);
            query += ` a.name ILIKE $${params.length}`;
        }
    }

    query += `;`;

    const result = await db.query<RequestListing>(query, params);

    const { rows, rowCount } = result;
    return { rows, rowCount };
}

export async function createBook(bookName: string, authorId: number) {
    const query: string = `WITH new_book AS (
    INSERT INTO book (name) 
    VALUES ($1) 
    RETURNING id
  )
  INSERT INTO book_author (book_id, author_id)
  SELECT new_book.id, $2
  FROM new_book;`;
    const params: (string | number)[] = [bookName, authorId];
    await db.query(query, params);
    return;
}

export async function findBookByName(bookName: string) {
    const result = await db.query<{ id: number }>(
        `SELECT id FROM book 
      WHERE name = $1;`,
        [bookName]
    );
    const { rows, rowCount } = result;
    return { rows, rowCount };
}

export async function createBookById(bookId: number, authorId: number) {
    await db.query(
        `INSERT INTO book_author (book_id, author_id) VALUES ($1, $2);`,
        [bookId, authorId]
    );
    return;
}

export async function findRelation(id: number) {
    const result = await db.query<FullRelation>(
        `SELECT ba.*, b.name AS book, a.name AS author
   FROM book_author ba
   JOIN book b ON ba.book_id = b.id
   JOIN authors a ON ba.author_id = a.id
   WHERE ba.id = $1;`,
        [id]
    );
    const { rows, rowCount } = result;
    return { rows, rowCount };
}

export async function deleteRelation(id: number) {
    await db.query(`DELETE FROM book_author WHERE id = $1;`, [id]);
    return;
}

export async function listByBooks(name: string) {
    const result = await db.query<RequestListing>(
        `
  SELECT 
  ba.id AS id,
  b.name AS book, 
  a.name AS author 
  FROM book 
  JOIN book_author ba ON book.id = ba.book_id
  JOIN authors a ON ba.author_id = a.id
  WHERE book.name ILIKE $1;
  `,
        [`%${name}%`]
    );
    const { rows, rowCount } = result;
    return { rows, rowCount };
}

export async function editRelation(id: number, authorId: number) {
    const result = await db.query(
        `UPDATE book_author SET author_id = $2 WHERE id = $1;`,
        [id, authorId]
    );
    const { rows, rowCount } = result;
    return { rows, rowCount };
}
