import { useEffect, useState } from "react";
import Header from "./components/Header"; // Adjust the path as necessary

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme; // Update body class directly
    localStorage.setItem("theme", theme); // Persist the theme in localStorage
  }, [theme]);

  return (
    <>
      <Header darkMode={theme === "dark"} toggleDarkMode={toggleTheme} />
      {/* Other app content goes here */}
    </>
  );
}

export default App;
