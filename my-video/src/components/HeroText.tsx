import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOW, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

interface HeroTextProps {
  line1: string;
  line2?: string;
  line3?: string;
  delay?: number;
  size?: "xl" | "lg" | "md";
  align?: "left" | "center" | "right";
  gold?: boolean;
}

export const HeroText: React.FC<HeroTextProps> = ({
  line1,
  line2,
  line3,
  delay = 0,
  size = "xl",
  align = "center",
  gold = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sizes = { xl: 96, lg: 72, md: 52 };
  const fontSize = sizes[size];

  const makeAnim = (lineDelay: number) => {
    const s = spring({ frame: frame - delay - lineDelay, fps, config: SPRING_GENTLE });
    return {
      opacity: interpolate(s, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
    };
  };

  const a1 = makeAnim(0);
  const a2 = makeAnim(6);
  const a3 = makeAnim(12);

  const lineStyle: React.CSSProperties = {
    fontFamily: FONTS.serif,
    fontSize,
    fontWeight: FONTS.light,
    lineHeight: 1.08,
    letterSpacing: "0.02em",
    color: gold ? "transparent" : COLORS.white,
    backgroundImage: gold ? GRADIENT.goldH : undefined,
    backgroundClip: gold ? "text" : undefined,
    WebkitBackgroundClip: gold ? "text" : undefined,
    WebkitTextFillColor: gold ? "transparent" : undefined,
    textShadow: gold ? "none" : SHADOW.text,
    display: "block",
    textAlign: align,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ ...lineStyle, ...a1 }}>{line1}</span>
      {line2 && <span style={{ ...lineStyle, ...a2 }}>{line2}</span>}
      {line3 && <span style={{ ...lineStyle, ...a3 }}>{line3}</span>}
    </div>
  );
};
