import styles from "../styles/Header.module.scss";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo</h1>
      <img
        src={
          darkMode
            ? "public/images/icon-moon.svg"
            : "public/images/icon-sun.svg"
        } // Dynamic image source based on darkMode
        alt={darkMode ? "Moon icon" : "Sun icon"}
        className={styles.icon}
        onClick={toggleDarkMode} // Toggle the theme when clicked
      />
    </header>
  );
};

export default Header;
