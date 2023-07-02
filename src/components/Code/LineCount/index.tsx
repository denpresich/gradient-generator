import React from "react";

import styles from "./styles.module.css";
import cn from "classnames";

export interface LineCountProps {
  className?: string;
}

export const LineCount: React.FC<LineCountProps> = ({ className }) => {
  return (
    <div className={cn(styles["line-count"], className)}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
    </div>
  );
};
