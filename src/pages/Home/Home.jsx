import { useEffect, useState } from "react";
import "./Home.css";
import { todoServices } from "../../apiServices/todoServices.js";
import TodoForm from "../../components/TodoForm/TodoForm.jsx";
import TodoList from "../../components/TodoList/TodoList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import MainLoader from "../../components/MainLoader/MainLoader.jsx";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editTodo) return;

    // Only update non-empty fields
    const updatedFields = {};
    if (editTitle.trim() !== "") updatedFields.title = editTitle;
    if (editDescription.trim() !== "")
      updatedFields.description = editDescription;

    try {
      const updated = await todoServices.updateTodo(
        editTodo._id,
        updatedFields
      );
      setTodos(todos.map((t) => (t._id === editTodo._id ? updated : t)));
    } catch (err) {
      console.error("Error editing todo:", err);
    } finally {
      setEditTodo(null); // Close modal
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (loading)
    return (
      <div className="loader">
        <MainLoader />
        <p>Loading your todos...</p>
      </div>
    );

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <div className="header">
            <h1>
              <FontAwesomeIcon icon={faListCheck} /> To-Do List
            </h1>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="header-actions">
            <TodoForm onAdd={handleAdd} />
          </div>
        </div>

        <div className="todo-list-container">
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>

      {editTodo && (
        <div className="edit-overlay">
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <h3>Edit Todo</h3>

            <input
              type="text"
              placeholder="New title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              placeholder="New description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="edit-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditTodo(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
