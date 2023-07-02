import React from "react";

import styles from "./styles.module.css";

import { Color as ColorComponent } from "../Color";

import { Color } from "@/shared/types";

export interface ColorsProps {
  colors: Color[];
  selectedColorId: string;
  onChange: (id: string, color: Color) => void;
  onSelect: (id: string) => void;
}

export const Colors: React.FC<ColorsProps> = ({
  colors,
  selectedColorId,
  onChange,
  onSelect,
}) => {
  return (
    <div className={styles.Colors}>
      {colors
        .sort((a, b) => a.position - b.position)
        .map((color) => (
          <ColorComponent
            key={color.hex}
            selected={color.id === selectedColorId}
            hex={color.hex}
            position={color.position}
            onChange={({ hex, position }) =>
              onChange(color.id, { id: color.id, hex, position })
            }
            onSelect={() => onSelect(color.id)}
          />
        ))}
    </div>
  );
};
