import { useEffect, useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary
import CreateTodo from "./components/CreateTodo";
import TodoList, { Todo } from "./components/TodoList";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Failed to parse todos from localStorage", error);
      return [];
    }
  });

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Completed"
  >("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Update localStorage with todos
    localStorage.setItem("todos", JSON.stringify(todos));

    // Update filteredTodos based on activeFilter
    switch (activeFilter) {
      case "Active":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [todos, activeFilter]); // Dependencies include todos and activeFilter

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

  const updateFilteredTodos = (status: "All" | "Active" | "Completed") => {
    switch (status) {
      case "Active":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleFilterChange = (status: "All" | "Active" | "Completed") => {
    setActiveFilter(status);
    updateFilteredTodos(status);
  };

  return (
    <div className="App">
      <Header darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      <CreateTodo darkMode={theme === "dark"} onAddTodo={addTodo} />
      {todos.length > 0 && (
        <TodoList
          todos={filteredTodos} // Pass the filtered list here
          toggleTodo={toggleTodo}
          clearCompleted={clearCompleted}
          filterTodos={handleFilterChange} // Change the filter through this handler
          deleteTodo={deleteTodo}
          darkMode={theme === "dark"}
        />
      )}
    </div>
  );
}

export default App;
