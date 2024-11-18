import { mw } from "@/api/mw";
import { createUser, readUsers } from "@/db/crudUser";

const handle = mw(async (req, res) => {
  if (req.method === "GET") {
    const users = await readUsers();

    res.send(users);

    return;
  }
  if (req.method === "POST") {
    const newUser = await createUser(req.body);

    res.send(newUser);

    return;
  }

  res.status(405).send({ error: "Method not allowed" });
});

export default handle;
