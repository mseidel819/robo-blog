import styles from "./button.module.css";

const GlitchButton = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default GlitchButton;
