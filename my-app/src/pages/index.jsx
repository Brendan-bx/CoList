import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/todos/create/todo"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des todos :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (id) => {
    router.push(`/todos/${id}`);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Liste des Todos</h1>
      {loading ? (
        <p className="text-gray-600">Chargement des todos...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">Aucun todo trouvé.</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {todo.name}
                  </h2>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                </div>
                <button
                  onClick={() => handleViewMore(todo._id)}
                  className="ml-4 text-blue-500 hover:text-blue-700"
                >
                  Voir plus
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
