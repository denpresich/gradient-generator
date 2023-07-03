"use client";

import React from "react";
import Link from "next/link";

import * as Form from "@radix-ui/react-form";

import cn from "classnames";

import { TypeToggle } from "@/components/TypeToggle";
import { Colors } from "@/components/Colors";
import { Input } from "@/components/Input";
import { ColorPicker } from "@/components/ColorPicker";
import { Code } from "@/components/Code";

import styles from "./styles.module.css";

import { GradientType, Color } from "@/shared/types";

import {
  composeLinearGradient,
  composeRadialGradient,
  random as randomColor,
} from "@/utils/color";

type State = {
  colors: Color[];
  selectedColorId: string;
  deg: number;
  type: GradientType;
};

type Action =
  | { type: "ADD_COLOR"; payload: { color: Color } }
  | { type: "REMOVE_COLOR"; payload: { id: string } }
  | { type: "UPDATE_COLOR"; payload: { id: string; color: Color } }
  | { type: "UPDATE_DEG"; payload: { deg: number } }
  | { type: "UPDATE_TYPE"; payload: { type: GradientType } }
  | { type: "SELECT_COLOR"; payload: { id: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_COLOR": {
      return {
        ...state,
        colors: [...state.colors, action.payload.color],
      };
    }
    case "REMOVE_COLOR": {
      const { id } = action.payload;
      return {
        ...state,
        colors: state.colors.filter((c) => c.id !== id),
      };
    }
    case "UPDATE_COLOR": {
      const { id, color } = action.payload;
      return {
        ...state,
        colors: state.colors.map((c) => (c.id === id ? color : c)),
      };
    }
    case "UPDATE_DEG": {
      const { deg } = action.payload;
      return {
        ...state,
        deg,
      };
    }
    case "UPDATE_TYPE": {
      const { type } = action.payload;
      return {
        ...state,
        type,
      };
    }
    case "SELECT_COLOR": {
      return { ...state, selectedColorId: action.payload.id };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, {
    colors: [
      { id: "1", hex: "#CB4DF2", position: 0 },
      { id: "2", hex: "#7C3EFF", position: 50 },
      { id: "3", hex: "#0072FF", position: 100 },
    ],
    selectedColorId: "1",
    deg: 90,
    type: GradientType.LINEAR,
  });

  const sortedColors = React.useMemo(
    () => state.colors.sort((a, b) => a.position - b.position),
    [state.colors]
  );

  const gradient = React.useMemo(
    () =>
      state.type === GradientType.LINEAR
        ? composeLinearGradient(sortedColors, state.deg)
        : composeRadialGradient(sortedColors),
    [sortedColors, state.deg, state.type]
  );

  const selectedColor =
    state.colors.find((c) => c.id === state.selectedColorId) || state.colors[0];

  const handleToggleChange = (type: GradientType) =>
    type &&
    dispatch({
      type: "UPDATE_TYPE",
      payload: { type },
    });

  const handleDegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const deg = Math.min(Math.max(Number(e.target.value), 0), 360);

    dispatch({ type: "UPDATE_DEG", payload: { deg } });
  };

  const handleColorChange = (id: string, color: Color) =>
    dispatch({
      type: "UPDATE_COLOR",
      payload: { id, color },
    });

  const handleColorSelect = (id: string) =>
    dispatch({
      type: "SELECT_COLOR",
      payload: { id },
    });

  const handleColorAdd = () =>
    dispatch({
      type: "ADD_COLOR",
      payload: {
        color: {
          id: Math.random().toString(),
          hex: randomColor(),
          position: 100,
        },
      },
    });

  const handleColorRemove = (id: string) =>
    state.colors.length > 2 &&
    dispatch({
      type: "REMOVE_COLOR",
      payload: { id },
    });

  const handleColorPickerChange = (hex: string) =>
    dispatch({
      type: "UPDATE_COLOR",
      payload: {
        id: state.selectedColorId,
        color: {
          id: state.selectedColorId,
          position: selectedColor?.position,
          hex,
        },
      },
    });

  return (
    <main>
      <div
        className={styles["background"]}
        style={{ backgroundImage: gradient }}
      />
      <div className={styles["panel"]}>
        <section
          className={cn(
            styles["gradient-toggle__selector"],
            styles["gradient-toggle"]
          )}
        >
          <TypeToggle value={state.type} onChange={handleToggleChange} />
          {state.type === GradientType.LINEAR && (
            <Form.Root>
              <Form.Field className={styles["deg-field"]} name="deg">
                <Form.Label className={styles["deg-field__label"]}>
                  Deg
                </Form.Label>
                <Form.Control asChild>
                  <Input
                    type="number"
                    value={state.deg}
                    min={0}
                    max={360}
                    onChange={handleDegChange}
                  />
                </Form.Control>
              </Form.Field>
            </Form.Root>
          )}
        </section>
        <section className={styles["gradient-color"]}>
          <Colors
            colors={state.colors}
            selectedColorId={state.selectedColorId}
            onChange={handleColorChange}
            onSelect={handleColorSelect}
            onAdd={handleColorAdd}
            onRemove={handleColorRemove}
          />
          <ColorPicker
            value={selectedColor?.hex}
            onChange={handleColorPickerChange}
          />
        </section>
        <section className={styles["gradient-code"]}>
          <Code>{`background: ${gradient}`}</Code>
        </section>
        <section className={styles["gradient-contact"]}>
          <p>
            Made by{" "}
            <Link className={styles["link"]} href="https://denyspresich.com">
              Denys Presich
            </Link>
          </p>
          <p>
            {"Project's code is available at "}
            <Link
              className={styles["link"]}
              href="https://github.com/denpresich/gradient-generator"
            >
              GitHub
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
