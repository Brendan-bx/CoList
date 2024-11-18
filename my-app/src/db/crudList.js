import { TodoModel } from "@/db/model/list";

export const createTodo = async (data) => {
  const newPlace = new TodoModel(data);

  await newPlace.save();

  return newPlace;
};
export const readTodos = async () => await TodoModel.find();
export const readTodo = async (todoId) => await TodoModel.findById(todoId);
export const updateTodo = async (placeId, data) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(placeId, data, {
    returnDocument: "after",
  });

  return updatedTodo;
};
export const deleteTodo = async (todoId) => {
  const place = await TodoModel.findOneAndDelete({ _id: todoId });

  if (!place) {
    return null;
  }

  return place;
};
