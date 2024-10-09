import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const typoStack = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const list = style({
  columnCount: 1,
  "@media": {
    "(min-width: 400px)": {
      columnCount: 2,
    },
    "(min-width: 700px)": {
      columnCount: 3,
    },
  },
});
