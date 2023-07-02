import React from "react";

import styles from "./styles.module.css";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { GradientType } from "@/shared/types";

export interface TypeToggleProps {
  value: GradientType;
  onChange: (value: GradientType) => void;
}

export const TypeToggle: React.FC<TypeToggleProps> = ({ value, onChange }) => {
  return (
    <ToggleGroup.Root
      className={styles["toggle-group"]}
      type="single"
      value={value}
      onValueChange={onChange}
    >
      <ToggleGroup.Item
        className={styles["toggle-group__item"]}
        value={GradientType.LINEAR}
      >
        Linear
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={styles["toggle-group__item"]}
        value={GradientType.RADIAL}
      >
        Radial
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
