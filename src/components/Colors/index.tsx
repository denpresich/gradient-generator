import React from "react";

import styles from "./styles.module.css";

import { Color as ColorComponent } from "../Color";

import { Color } from "@/shared/types";

export interface ColorsProps {
  colors: Color[];
  onChange: (id: string, color: Color) => void;
}

export const Colors: React.FC<ColorsProps> = ({ colors, onChange }) => {
  return (
    <div className={styles.Colors}>
      {colors.map((color) => (
        <ColorComponent
          key={color.hex}
          hex={color.hex}
          position={color.position}
          onChange={({ hex, position }) =>
            onChange(color.id, { id: color.id, hex, position })
          }
        />
      ))}
    </div>
  );
};
