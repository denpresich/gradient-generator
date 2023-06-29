import styles from "./styles.module.css";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return <input className={styles.Input} {...props} />;
};
