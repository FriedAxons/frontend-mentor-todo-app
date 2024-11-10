import styles from "../styles/TodoList.module.scss";

interface TodoListProps {
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ darkMode }) => {
  return (
    <div
      className={`${styles.todoList} ${darkMode ? styles.dark : styles.light}`}
    ></div>
  );
};

export default TodoList;
