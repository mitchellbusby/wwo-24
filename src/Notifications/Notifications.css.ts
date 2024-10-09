import { globalStyle, style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  alignItems: "center",
});

export const notificationsList = style({
  display: "flex",
  flexDirection: "column",
});

globalStyle(`${notificationsList} > *`, {
  marginBottom: "16px",
});
