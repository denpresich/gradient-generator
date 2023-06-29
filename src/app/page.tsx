"use client";

import React from "react";

import * as Form from "@radix-ui/react-form";

import { TypeToggle } from "@/components/TypeToggle";
import { Colors } from "@/components/Colors";

import styles from "./styles.module.css";

import { GradientType, Color } from "@/shared/types";

import { random as randomColor } from "@/utils/color";
import { composeLinearGradient, composeRadialGradient } from "@/utils/color";

type State = {
  colors: Color[];
  deg: number;
  type: GradientType;
};

type Action =
  | { type: "ADD_COLOR"; payload: { color: Color } }
  | { type: "REMOVE_COLOR"; payload: { id: string } }
  | { type: "UPDATE_COLOR"; payload: { id: string; color: Color } }
  | { type: "UPDATE_DEG"; payload: { deg: number } }
  | { type: "UPDATE_TYPE"; payload: { type: GradientType } };

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
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(reducer, {
    colors: [
      { id: "1", hex: randomColor(), position: 0 },
      { id: "2", hex: randomColor(), position: 50 },
      { id: "3", hex: randomColor(), position: 100 },
    ],
    deg: 90,
    type: GradientType.LINEAR,
  });

  const gradient = React.useMemo(
    () =>
      state.type === GradientType.LINEAR
        ? composeLinearGradient(state.colors, state.deg)
        : composeRadialGradient(state.colors),
    [state.colors, state.deg, state.type]
  );

  return (
    <main
      className="absolute top-0 right-0 bottom-0 left-0"
      style={{ backgroundImage: gradient }}
    >
      <div className={styles.Panel}>
        <TypeToggle
          value={state.type}
          onChange={(type) =>
            dispatch({ type: "UPDATE_TYPE", payload: { type } })
          }
        />
        {state.type === GradientType.LINEAR && (
          <Form.Root>
            <Form.Field className={styles.FormField} name="deg">
              <Form.Label className={styles.FormLabel}>Deg</Form.Label>
              <Form.Control
                className={styles.FormInput}
                type="number"
                min={0}
                max={360}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_DEG",
                    payload: { deg: Number(e.target.value) },
                  })
                }
              />
            </Form.Field>
          </Form.Root>
        )}
        <Colors colors={state.colors} />
      </div>
    </main>
  );
}
