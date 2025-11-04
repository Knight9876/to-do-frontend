import { useEffect, useState } from "react";
import "./Home.css";
import { todoServices } from "../../apiServices/todoServices.js";
import TodoForm from "../../components/TodoForm/TodoForm.jsx";
import TodoList from "../../components/TodoList/TodoList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader.jsx";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    try {
      const data = await todoServices.getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todoData) => {
    try {
      const newTodo = await todoServices.createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id, update) => {
    try {
      const updated = await todoServices.updateTodo(id, update);
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoServices.deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirects user to login
  };

  if (loading)
    return (
      <div className="loader">
        <Loader />
        <p>Loading your todos...</p>
      </div>
    );

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    <div className="home-container">

      <div className="home-header">
        <h1>
          <FontAwesomeIcon icon={faListCheck} /> To-Do List
        </h1>

        <div className="header-actions">
          <TodoForm onAdd={handleAdd} />
        </div>
      </div>

      <div className="todo-list-container">
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
    </>
  );
};

export default Home;
