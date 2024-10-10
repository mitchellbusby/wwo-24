import { globalStyle, style } from "@vanilla-extract/css";

export const iframeContainer = style({
  display: "flex",
  justifyContent: "center",
});

export const iframe = style({
  aspectRatio: "16 / 9",
  width: "100% !important",
});

globalStyle("body, a", {
  backgroundColor: "#6c5ce7",
  color: "white",
  fontSize: "18px",
});
