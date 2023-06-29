import styles from "./styles.module.css";

import React from "react";

import * as Form from "@radix-ui/react-form";

import { Input } from "@/components/Input";

export interface ColorProps {
  hex: string;
  position: number;
}

export const Color: React.FC<ColorProps> = ({ hex, position }) => {
  return (
    <Form.Root className={styles.Color}>
      <div className={styles.ColorBox}>
        <div className={styles.ColorBoxBg} style={{ backgroundColor: hex }} />
      </div>
      <Form.Field name="hex">
        <Form.Control asChild>
          <Input type="text" value={hex} />
        </Form.Control>
      </Form.Field>
      <Form.Field name="position">
        <Form.Control asChild>
          <Input type="number" value={position} min={0} max={100} />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
