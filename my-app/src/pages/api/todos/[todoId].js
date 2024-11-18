import { mw } from "@/api/mw";
import { deleteTodo, readTodo, updateTodo } from "@/db/crudList";

const handle = mw(async (req, res) => {
  const { todoId } = req.query;

  if (req.method === "GET") {
    const todo = await readTodo(todoId);

    if (!todo) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(todo);

    return;
  }

  if (req.method === "PATCH") {
    const updatedBar = await updateTodo(todoId, req.body);

    if (!updatedBar) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(updatedBar);

    return;
  }

  if (req.method === "DELETE") {
    const todoToBeDelete = await deleteTodo(todoId);

    if (!todoToBeDelete) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(todoToBeDelete);

    return;
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
