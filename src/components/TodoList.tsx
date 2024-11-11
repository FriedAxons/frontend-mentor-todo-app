import styles from "../styles/TodoList.module.scss";

interface Todo {
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
        {todos.map((todo, index) => (
          <li key={todo.id} className={styles.todoItem}>
            <span
              className={`${styles.radioButton} ${
                todo.completed ? styles.completed : ""
              }`}
              onClick={() => toggleTodo(todo.id)}
            ></span>
            <span className={styles.todoText}>{todo.text}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.itemsLeft}>{itemsLeft} items left</span>
        <div className={styles.filters}>
          <button onClick={() => filterTodos("all")}>All</button>
          <button onClick={() => filterTodos("active")}>Active</button>
          <button onClick={() => filterTodos("completed")}>Completed</button>
        </div>
        <button className={styles.clearCompleted} onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
