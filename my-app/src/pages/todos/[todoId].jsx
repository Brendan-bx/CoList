import { Button } from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const getServerSideProps = async ({ query: { todoId } }) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/todos/${todoId}`
    );
    return {
      props: {
        todo: data,
      },
    };
  } catch (error) {
    console.error("Error fetching todo data:", error);
    return {
      notFound: true,
    };
  }
};

const InfoPage = ({ todo }) => {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  const handleDelete = (todoId) => async () => {
    if (!todos) return;

    const newTodos = todos.filter((todo) => todo._id !== todoId);
    setTodos(newTodos);

    try {
      await axios.delete(`http://localhost:3000/api/todos/${todoId}`);
      router.push("/");
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  const handleEdit = (todoId) => {
    router.push(`/list/${todoId}/editTodo`);
  };

  const RenderTodoInfo = ({ todo }) => {
    if (!todo) return null;

    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-gray-800">{todo.name}</h1>
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {todo.description}
        </p>
        <div className="text-base text-gray-700">
          <strong>Content:</strong> {todo.content}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <RenderTodoInfo todo={todo} />

      <div className="flex gap-4 mt-6">
        <Button
          onClick={handleDelete(todo._id)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete Todo
        </Button>
        <Button
          onClick={() => handleEdit(todo._id)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Edit Todo
        </Button>
      </div>
    </div>
  );
};

export default InfoPage;
