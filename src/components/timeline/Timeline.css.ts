import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const wrapper = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

export const eventCount = createVar();

export const line = style({
  height: `calc(${eventCount} * 150px)`,
  width: "16px",
  background: "#c0392b",
  borderRadius: "8px",
});

export const eventOffset = createVar();

export const event = recipe({
  base: {
    position: "absolute",
    top: eventOffset,
    maxWidth: "200px",
    "@media": {
      "(max-width: 490px)": {
        background: "#27ae60",
        padding: "12px",
        borderRadius: "8px",
      },
    },
  },
  variants: {
    align: {
      left: {
        left: 0,
      },
      right: {
        right: 0,
      },
    },
  },
});

export const year = style({
  fontSize: "24px",
});
