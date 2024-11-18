import { listTodo } from "@/db/schema/listTodo";
import mongoose from "mongoose";

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", listTodo, "Todo");
