import React from "react";

import styles from "./styles.module.css";
import cn from "classnames";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className={cn(styles["header"], className)}>
      <div className={styles["header-item"]}>styles.css</div>
    </div>
  );
};
