import { Schema } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorName: String,
});

export const bookModel = (conn) => {
  return conn.model("Book", bookSchema);
};
