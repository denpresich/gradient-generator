"use client";

import React from "react";

import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

import { TypeToggle, GradientType } from "@/components/TypeToggle";

import styles from "./styles.module.css";

import { random as randomColor } from "@/utils/color";

type Color = {
  hash: string;
  position: number;
};

const getLinearGradient = (colors: Color[], deg: number) => {
  const gradient = `linear-gradient(${deg}deg, ${colors
    .map(({ hash, position }) => `${hash} ${position}%`)
    .join(", ")})`;
  return gradient;
};

const getRadialGradient = (colors: Color[]) => {
  const gradient = `radial-gradient(${colors
    .map(({ hash, position }) => `${hash} ${position}%`)
    .join(", ")})`;
  return gradient;
};

const getGradient = (colors: Color[], deg: number, type: GradientType) => {
  switch (type) {
    case GradientType.LINEAR:
      return getLinearGradient(colors, deg);
    case GradientType.RADIAL:
      return getRadialGradient(colors);
    default:
      return getLinearGradient(colors, deg);
  }
};

export default function Home() {
  const [colors, setColors] = React.useState([
    { hash: randomColor(), position: 0 },
    { hash: randomColor(), position: 50 },
    { hash: randomColor(), position: 100 },
  ]);
  const [deg, setDeg] = React.useState(90);
  const [type, setType] = React.useState(GradientType.LINEAR);

  const gradient = React.useMemo(
    () => getGradient(colors, deg, type),
    [colors, deg, type]
  );

  return (
    <main
      className="absolute top-0 right-0 bottom-0 left-0"
      style={{ backgroundImage: gradient }}
    >
      <div className={styles.Panel}>
        <TypeToggle
          value={type}
          onChange={(value) => setType(value as GradientType)}
        />
      </div>
    </main>
  );
}
