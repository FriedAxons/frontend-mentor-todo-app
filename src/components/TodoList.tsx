import { useState } from "react";
import styles from "../styles/TodoList.module.scss";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  filterTodos: (status: "All" | "Active" | "Completed") => void;
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  clearCompleted,
  filterTodos,
  darkMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Completed"
  >("All");
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleFilterClick = (status: "All" | "Active" | "Completed") => {
    setActiveFilter(status);
    filterTodos(status);
  };

  return (
    <div
      className={`${styles.todoList} ${darkMode ? styles.dark : styles.light}`}
    >
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={styles.todoItem}
            onClick={() => toggleTodo(todo.id)}
          >
            <span
              className={`${styles.radioButton} ${
                todo.completed ? styles.completed : ""
              }`}
            ></span>
            <span
              className={`${styles.todoText} ${
                todo.completed ? styles.completed : ""
              }`}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.itemsLeft}>{itemsLeft} items left</span>
        <div className={styles.filters}>
          <button
            onClick={() => handleFilterClick("All")}
            className={activeFilter === "All" ? styles.active : ""}
          >
            All
          </button>
          <button
            onClick={() => handleFilterClick("Active")}
            className={activeFilter === "Active" ? styles.active : ""}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterClick("Completed")}
            className={activeFilter === "Completed" ? styles.active : ""}
          >
            Completed
          </button>
        </div>
        <button className={styles.clearCompleted} onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
      <p className="dragHint">Drag and drop to reorder list</p>
    </div>
  );
};

export default TodoList;
