import { keyframes, style } from "@vanilla-extract/css";

export const weirdSpacerWrapper = style({
  padding: "80px 0",
});

const weirdSpacerRotation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "25%": { transform: "rotate(20deg)" },
  "50%": { transform: "rotate(0deg)" },
  "75%": { transform: "rotate(-20deg)" },
  "100%": { transform: "rotate(0deg)" },
});

export const weirdSpacer = style({
  transform: "rotate(20deg)",
  border: "2px solid #a29bfe",
  animation: weirdSpacerRotation,
  animationDuration: "6s",
  animationTimingFunction: "cubic-bezier(0.2, 0, 0.4, 1)",
  animationIterationCount: "infinite",
});
