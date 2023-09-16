export type Error = {
    type: string;
    message: string;
};

export type RequestListing = {
    id: number;
    book: string;
    author: string;
};

export type ServerResponse = {
    rows: RequestListing[];
    rowCount: number;
};

export type RequestAuthor = Omit<RequestListing, "book">;
export type BookAuthor = Omit<RequestListing, "id">;
export type Author = Omit<BookAuthor, "book">;

export type FullRelation = {
  id: number;
  book_id: number;
  author_id: number;
  book: string;
  author: string;
};