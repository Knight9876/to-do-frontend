import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
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

      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEdit(todo)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
