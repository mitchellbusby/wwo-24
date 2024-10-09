import { style } from "@vanilla-extract/css";

export const blessedSparkle = style({
  position: "fixed",
  fontSize: "48px",
  userSelect: "none",
});

export const blessedOuterIsland = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  height: "100dvh",
  fontFamily: "system-ui, sans-serif",
});

export const blessedIsland = style({
  padding: "24px",
  border: "1px solid black",
});
