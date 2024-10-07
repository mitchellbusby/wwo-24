import { style } from "@vanilla-extract/css";

export const notification = style({
  display: "flex",
  width: "100%",
  gap: "16px",
  border: "1px solid black",
  borderRadius: 8,
  padding: 16,
  userSelect: "none",
  background: "white",
  "@media": {
    "screen and (min-width: 450px)": {
      width: "450px",
    },
  },
});

// 8m ago
// 45m ago
// 9:15am
