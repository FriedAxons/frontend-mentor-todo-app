import React, { useState } from "react";
import styles from "../styles/CreateTodo.module.scss";

// Corrected syntax for the interface
interface CreateTodoProps {
  darkMode: boolean;
  onAddTodo: (todo: string) => void;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ darkMode, onAddTodo }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onAddTodo(input.trim());
      setInput(""); // Clear input after adding the todo
    }
  };

  return (
    <div
      className={`${styles.createTodo} ${
        darkMode ? styles.dark : styles.light
      }`}
    >
      <span className={styles.circle}></span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Create a new todo..."
        className={styles.input} // Correct className usage
      />
    </div>
  );
};

export default CreateTodo;
