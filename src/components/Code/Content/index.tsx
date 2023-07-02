import React from "react";

import styles from "./styles.module.css";
import cn from "classnames";

export interface ContentProps {
  className?: string;
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ className, children }) => {
  return <code className={cn(styles["content"], className)}>{children}</code>;
};
