import React from "react";

import "./styles.css";

import { HexAlphaColorPicker } from "react-colorful";

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={"ColorPicker"}>
      <HexAlphaColorPicker
        color={value}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};
