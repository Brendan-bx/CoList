import { UserModel } from "@/db/model/user";

export const createUser = async (data) => {
  const newUser = new UserModel(data);

  await newUser.save();

  return newUser;
};
export const readUsers = async () => await UserModel.find();
export const readUser = async (userId) => await UserModel.findById(userId);
export const updateUser = async (userId, data) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  });

  return updatedUser;
};
export const deleteTodo = async (userId) => {
  const user = await UserModel.findOneAndDelete({ _id: userId });

  if (!user) {
    return null;
  }

  return user;
};
