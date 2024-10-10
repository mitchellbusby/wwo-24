import { style } from "@vanilla-extract/css";

export const iframeContainer = style({
  display: "flex",
  justifyContent: "center",
});

export const iframe = style({
  aspectRatio: "16 / 9",
  width: "100% !important",
});
