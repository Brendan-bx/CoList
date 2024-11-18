import { listUsers } from "@/db/schema/listUsers";
import mongoose from "mongoose";

export const TodoModel =
  mongoose.models.Users || mongoose.model("Users", listUsers, "Users");
