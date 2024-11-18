import { mw } from "@/api/mw";
import { deleteUser, readUser, updateUser } from "@/db/crudUser";

const handle = mw(async (req, res) => {
  const { userId } = req.query;

  if (req.method === "GET") {
    const user = await readUser(userId);

    if (!user) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(user);

    return;
  }

  if (req.method === "PATCH") {
    const updatedUser = await updateUser(userId, req.body);

    if (!updatedUser) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(updatedUser);

    return;
  }

  if (req.method === "DELETE") {
    const userToBeDelete = await deleteUser(userId);

    if (!userToBeDelete) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(userToBeDelete);

    return;
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
