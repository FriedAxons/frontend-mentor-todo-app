import styles from "../styles/Header.module.scss";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>TODO</h1>
      <img
        src={darkMode ? "images/icon-moon.svg" : "images/icon-sun.svg"} // Dynamic image source based on darkMode "
        alt={darkMode ? "Moon icon" : "Sun icon"}
        className={styles.img}
        onClick={toggleDarkMode} // Calls toggleTheme in App on click
      />
    </header>
  );
};

export default Header;
