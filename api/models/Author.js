import { Schema } from "mongoose";

// mongodb assigns a unique id to each collection, no need to add it
const authorSchema = new Schema({
  name: String,
});

export const authorModel = (conn) => {
  return conn.model("Author", authorSchema);
};
