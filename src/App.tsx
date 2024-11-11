import { useEffect, useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  // Manage list of todos
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme; // Update body class directly
    localStorage.setItem("theme", theme); // Persist the theme in localStorage
  }, [theme]);

  // Function to add a new todo
  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo = { id: Date.now(), text, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filterTodos = (status: "All" | "Active" | "Completed") => {
    switch (status) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="App">
      <Header darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      <CreateTodo darkMode={theme === "dark"} onAddTodo={addTodo} />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          clearCompleted={clearCompleted}
          filterTodos={filterTodos}
          darkMode={theme === "dark"}
        />
      )}
    </div>
  );
}

export default App;
