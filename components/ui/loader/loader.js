import styles from "./loader.module.css";

const Loader = ({ size = "32px", color = "hsl(214, 97%, 59%)" }) => {
  return (
    <div style={{ height: size, width: size }} className={styles.container}>
      <svg viewBox="25 25 50 50">
        <circle style={{ stroke: color }} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};
export default Loader;
