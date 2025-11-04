import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import { faFaceSurprise } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (!todos.length)
    return (
      <p className="no-todos">
        Wow! No todo(s) remaining&nbsp;{" "}
        <FontAwesomeIcon size="2x" icon={faFaceSurprise} />
      </p>
    );
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
