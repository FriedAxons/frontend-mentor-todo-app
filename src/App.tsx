import React, { useState } from "react";
import Header from "./components/Header";
import "./styles/App.scss";

const App: React.FC = () => {
  // Create the darkMode state
  const [darkMode, setDarkMode] = useState(false);

  // Define the toggleDarkMode function to switch between modes
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default App;
