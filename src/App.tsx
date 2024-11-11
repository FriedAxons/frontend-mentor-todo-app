import { useEffect, useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  // Manage list of todos
  const [todos, setTodos] = useState<string[]>([]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme; // Update body class directly
    localStorage.setItem("theme", theme); // Persist the theme in localStorage
  }, [theme]);

  // Function to add a new todo
  const addTodo = (todo: string) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <Header darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      <CreateTodo darkMode={theme === "dark"} onAddTodo={addTodo} />
      {/* <TodoList darkMode={theme === "dark"} /> */}
    </div>
  );
}

export default App;
