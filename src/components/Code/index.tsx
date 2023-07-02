import React from "react";

import styles from "./styles.module.css";

import { LineCount } from "./LineCount";
import { Header } from "./Header";
import { Content } from "./Content";
import { Copy } from "./Copy";

export interface CodeProps {
  children: React.ReactNode;
}

export const Code: React.FC<CodeProps> = ({ children }) => {
  return (
    <div className={styles.code}>
      <LineCount className={styles["line-count"]} />
      <Header className={styles["header"]} />
      <Content className={styles["content"]}>{children}</Content>
      <Copy className={styles["copy"]} value={children as string} />
    </div>
  );
};
