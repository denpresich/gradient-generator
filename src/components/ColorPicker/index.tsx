import React from "react";

import "./styles.css";

import { HexAlphaColorPicker } from "react-colorful";

export const ColorPicker: React.FC = () => {
  return (
    <div className={"ColorPicker"}>
      <HexAlphaColorPicker />
    </div>
  );
};
