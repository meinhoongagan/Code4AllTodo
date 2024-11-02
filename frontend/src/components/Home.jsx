import React, { useEffect, useState } from "react";
import { auth } from "./FireBase";
import { signOut } from "firebase/auth";

function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedTodos = JSON.parse(localStorage.getItem(userId)) || [];
    setTodos(storedTodos);
  }, []);

  const handleAddTodo = () => {
    if (!todo) return;
    const userId = localStorage.getItem("userId");
    const updatedTodos = [...todos, { id: Date.now(), text: todo, completed: false }];
    setTodos(updatedTodos);
    localStorage.setItem(userId, JSON.stringify(updatedTodos));
    setTodo("");
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem(localStorage.getItem("userId"), JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(localStorage.getItem("userId"), JSON.stringify(updatedTodos));
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userId");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Todos</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id} className="flex justify-between items-center mb-2">
            <span className={t.completed ? "line-through" : ""}>{t.text}</span>
            <div>
              <button onClick={() => handleToggleTodo(t.id)} className="mr-2 text-indigo-500 hover:text-indigo-700">
                {t.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDeleteTodo(t.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="mt-4 w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
