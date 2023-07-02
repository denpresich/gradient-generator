import React from "react";
import Image from "next/image";

import styles from "./styles.module.css";

import { Color as ColorComponent } from "../Color";

import { Color } from "@/shared/types";

export interface ColorsProps {
  colors: Color[];
  selectedColorId: string;
  onChange: (id: string, color: Color) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export const Colors: React.FC<ColorsProps> = ({
  colors,
  selectedColorId,
  onChange,
  onSelect,
  onAdd,
  onRemove,
}) => {
  return (
    <div>
      <div className={styles["colors"]}>
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
              onRemove={() => onRemove(color.id)}
            />
          ))}
      </div>
      <button className={styles["add-btn"]} onClick={onAdd}>
        <Image src="/plus.svg" alt="Add new color" height={16} width={16} />
        Add new color
      </button>
    </div>
  );
};
