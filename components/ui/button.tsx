import React from "react";
import styles from "./button.module.css";

type Props = {
  children: string;
};

const GlitchButton = ({ children }: Props) => {
  return <button className={styles.button}>{children}</button>;
};

export default GlitchButton;
