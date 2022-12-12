import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }
  type Author {
    id: ID
    name: String
    books: [Book]
  }
  type Query {
    books: [Book]
    book(name: String!): Book!
    authors: [Author]
    author(name: String!): Author
  }
  input createBookInput {
    name: String
    genre: String
    authorName: String
  }
  input createAuthorInput {
    name: String
  }
  type Mutation {
    createBook(input: createBookInput): Book
    createAuthor(input: createAuthorInput): Author
    deleteBook(id: ID!): Int
    deleteAuthor(id: ID!): Int
    deleteBooks: Int
    deleteAuthors: Int
  }
`;
