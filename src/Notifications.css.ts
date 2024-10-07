import { globalStyle, style } from "@vanilla-extract/css";

export const notificationsList = style({
  display: "flex",
  flexDirection: "column",
});

globalStyle(`${notificationsList} > *`, {
  marginBottom: "16px",
});
