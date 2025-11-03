import { useEffect, useState } from "react";
import "./Home.css";
import { todoService } from "../../apiServices/todoService.js";
import TodoForm from "../../components/TodoForm/TodoForm.jsx";
import TodoList from "../../components/TodoList/TodoList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todoData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id, update) => {
    try {
      const updated = await todoService.updateTodo(id, update);
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading) return <p>Loading todos...</p>;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>
          <FontAwesomeIcon icon={faListCheck} /> To-Do List
        </h1>
        <TodoForm onAdd={handleAdd} />
      </div>
      <div className="todo-list-container">
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Home;
