import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT_STACK } from "./fonts";
import { COLORS } from "./theme";

// Placeholder. Each render job overwrites this file with the generated video.
export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg, color: COLORS.text, fontFamily: FONT_STACK, justifyContent: "center", alignItems: "center", fontSize: 72 }}>
    Placeholder
  </AbsoluteFill>
);
