import styles from "./styles.module.css";

import React from "react";
import Image from "next/image";

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
  onRemove: () => void;
}

export const Color: React.FC<ColorProps> = ({
  hex,
  position,
  selected,
  onChange,
  onSelect,
  onRemove,
}) => {
  const [hexValue, setHexValue] = React.useState(hex);
  const [positionValue, setPositionValue] = React.useState(position);

  React.useEffect(() => {
    setHexValue(hex);
  }, [hex]);

  React.useEffect(() => {
    setPositionValue(position);
  }, [position]);

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHexValue(e.target.value);

  const handleHexInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextHex = fixHexColor(e.target.value);

    setHexValue(nextHex);
    onChange({ position, hex: nextHex });
  };

  const handlePositionInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPositionValue(Number(e.target.value));

  const handlePositionInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPosition = adjustPosition(Number(e.target.value));

    setPositionValue(nextPosition);
    onChange({ hex, position: nextPosition });
  };

  return (
    <Form.Root
      className={cn(styles["color"], { [styles["color--selected"]]: selected })}
    >
      <div className={styles["color-box"]}>
        <div
          className={styles["color-box__bg"]}
          style={{ backgroundColor: hex }}
          onClick={onSelect}
        />
      </div>
      <Form.Field className={styles["field"]} name="hex">
        <Form.Label className={styles["field__label"]}>Hex</Form.Label>
        <Form.Control asChild>
          <Input
            type="text"
            value={hexValue}
            onFocus={onSelect}
            onChange={handleHexInputChange}
            onBlur={handleHexInputBlur}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className={styles["field"]} name="position">
        <Form.Label className={styles["field__label"]}>Stop</Form.Label>
        <Form.Control asChild>
          <Input
            type="number"
            min={0}
            max={100}
            value={positionValue.toString()}
            onFocus={onSelect}
            onChange={handlePositionInputChange}
            onBlur={handlePositionInputBlur}
          />
        </Form.Control>
      </Form.Field>
      <Image
        className={styles["remove-icon"]}
        onClick={onRemove}
        height={16}
        width={16}
        src="/close.svg"
        alt={`Remove color ${hex}`}
      />
    </Form.Root>
  );
};
