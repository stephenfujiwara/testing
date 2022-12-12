import { authorModel } from "../models/Author.js";
import { bookModel } from "../models/Book.js";

import mongoose from "mongoose";

export const resolvers = {
  Query: {
    books: async (parent, args) => {
      const connection = mongoose.createConnection(process.env.MONGO_URI, {
        useNewUrlParser: true,
      });
      const Book = bookModel(connection);
      const books = await Book.find({});
      connection.close();
      return books;
    },
    book: async (parent, args) => {
      return await Book.findOne({ name: args.name });
    },
    authors: async () => {
      return await Author.find({});
    },
    author: async (parent, args) => {
      return await Author.findOne({ name: args.name });
    },
  },
  Book: {
    author: async (parent, args) => {
      return await Author.findOne({ name: parent.authorName });
    },
  },
  Author: {
    books: async (parent, args) => {
      return await Book.find({
        authorName: parent.name,
      });
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const newBook = new Book({
        name: args.input.name,
        genre: args.input.genre,
        authorName: args.input.authorName,
      });
      const res = await newBook.save(); //writing to DB
      return {
        id: res.id,
        ...res._doc,
      };
    },
    createAuthor: async (parent, args) => {
      const newAuthor = new Author({
        name: args.input.name,
      });
      const res = await newAuthor.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    deleteBook: async (parents, args) => {
      return (await Book.deleteOne({ id: args.id })).deletedCount;
    },
    deleteAuthor: async (parent, args) => {
      return (await Author.deleteOne({ id: args.id })).deletedCount;
    },
    deleteBooks: async (parent, args) => {
      return (await Book.deleteMany({})).deletedCount;
    },
    deleteAuthors: async (parent, args) => {
      return (await Author.deleteMany({})).deletedCount;
    },
  },
};
