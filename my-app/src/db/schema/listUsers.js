import { Schema } from "mongoose";

export const listUsers = new Schema({
  ID: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});
