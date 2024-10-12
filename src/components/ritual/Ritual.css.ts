import { createVar, style } from "@vanilla-extract/css";

export const mapWrapper = style({
  position: "relative",
});

export const mapLegend = style({
  position: "fixed",
  width: "200px",
  // height: "400px",
  right: 16,
  top: 16,
  zIndex: 10000,
  background: "white",
  padding: 24,
});

export const mapLegendLayout = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const mapLegendKey = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const mapLegendLine = style({
  height: "4px",
  width: "32px",
});
