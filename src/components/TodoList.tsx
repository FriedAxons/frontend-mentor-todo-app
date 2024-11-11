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
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

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
            <span className={styles.todoText}>{todo.text}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.itemsLeft}>{itemsLeft} items left</span>
        <div className={styles.filters}>
          <button onClick={() => filterTodos("All")}>All</button>
          <button onClick={() => filterTodos("Active")}>Active</button>
          <button onClick={() => filterTodos("Completed")}>Completed</button>
        </div>
        <button className={styles.clearCompleted} onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
