import { Schema } from "mongoose";

export const listTodo = new Schema({
  ID: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  users: {
    owner: [String],
    coauthor: [String],
    members: [String],
  },
});
