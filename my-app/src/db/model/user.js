import { listUsers } from "@/db/schema/listUsers";
import mongoose from "mongoose";

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", listUsers, "Users");
