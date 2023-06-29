import { Color } from "@/shared/types";

export const composeLinearGradient = (colors: Color[], deg: number) => {
  const gradient = colors.reduce(
    (acc, color) => `${acc}, ${color.hex} ${color.position}%`,
    ""
  );
  return `linear-gradient(${deg}deg${gradient})`;
};

export const composeRadialGradient = (colors: Color[]) => {
  const gradient = colors.reduce(
    (acc, color) => `${acc}, ${color.hex} ${color.position}%`,
    ""
  );
  return `radial-gradient(circle${gradient})`;
};

export const random = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
