import styles from "./styles.module.css";

import React, { HTMLProps } from "react";

export const Input: React.FC<HTMLProps<HTMLInputElement>> = (props) => {
  return <input className={styles.Input} {...props} />;
};
