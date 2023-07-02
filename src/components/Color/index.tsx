import styles from "./styles.module.css";

import React from "react";

import cn from "classnames";

import { validateHTMLColorHex } from "validate-color";

import * as Form from "@radix-ui/react-form";

import { Input } from "@/components/Input";

const adjustPosition = (position: number) =>
  Math.min(100, Math.max(0, position));

const fixHexColor = (hex: string) => {
  let nextHex = hex;

  if (nextHex[0] !== "#") {
    nextHex = "#" + nextHex;
  }

  return validateHTMLColorHex(nextHex) ? nextHex : "#000000";
};

export interface ColorProps {
  hex: string;
  position: number;
  selected: boolean;
  onChange: ({ hex, position }: { hex: string; position: number }) => void;
  onSelect: () => void;
}

export const Color: React.FC<ColorProps> = ({
  hex,
  position,
  selected,
  onChange,
  onSelect,
}) => {
  const [hexValue, setHexValue] = React.useState(hex);
  const [positionValue, setPositionValue] = React.useState(position);

  React.useEffect(() => {
    setHexValue(hex);
  }, [hex]);

  React.useEffect(() => {
    setPositionValue(position);
  }, [position]);

  return (
    <Form.Root
      className={cn(styles.Color, { [styles["Color--selected"]]: selected })}
      onClick={onSelect}
    >
      <div className={styles.ColorBox}>
        <div className={styles.ColorBoxBg} style={{ backgroundColor: hex }} />
      </div>
      <Form.Field className={styles.Field} name="hex">
        <Form.Label className={styles.Field_Label}>Hex</Form.Label>
        <Form.Control asChild>
          <Input
            type="text"
            value={hexValue}
            onChange={(e) => setHexValue(e.target.value)}
            onBlur={(e) => {
              const nextHex = fixHexColor(e.target.value);

              setHexValue(e.target.value);
              onChange({ position, hex: nextHex });
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles.Field} name="position">
        <Form.Label className={styles.Field_Label}>Stop</Form.Label>
        <Form.Control asChild>
          <Input
            type="number"
            min={0}
            max={100}
            value={positionValue.toString()}
            onChange={(e) => setPositionValue(Number(e.target.value))}
            onBlur={(e) => {
              const nextPosition = adjustPosition(Number(e.target.value));

              setPositionValue(nextPosition);
              onChange({ hex, position: nextPosition });
            }}
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
