import { mw } from "@/api/mw";
import { createTodo, readTodos } from "@/db/crudList";

const handle = mw(async (req, res) => {
  if (req.method === "GET") {
    const todos = await readTodos();

    res.send(todos);

    return;
  }
  if (req.method === "POST") {
    const newTodo = await createTodo(req.body);

    res.send(newTodo);

    return;
  }

  res.status(405).send({ error: "Method not allowed" });
});

export default handle;
