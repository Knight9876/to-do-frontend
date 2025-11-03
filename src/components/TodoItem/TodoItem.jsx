import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TodoItem.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="todo-item">
      <div className="todo-item-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, { completed: !todo.completed })}
        />
        <div className="todo-text">
          <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </span>
          {todo.description && (
            <span className="todo-desc">{todo.description}</span>
          )}
        </div>
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo._id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default TodoItem;
