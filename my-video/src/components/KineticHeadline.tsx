import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_SNAPPY } from "../constants/timing";

interface KineticHeadlineProps {
  words: string[];
  delay?: number;
  highlight?: number[];
  fontSize?: number;
  align?: "left" | "center" | "right";
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  words,
  delay = 0,
  highlight = [],
  fontSize = 64,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.22em",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {words.map((word, i) => {
        const s = spring({
          frame: frame - delay - i * 3,
          fps,
          config: SPRING_SNAPPY,
        });
        const isHighlighted = highlight.includes(i);
        return (
          <span
            key={i}
            style={{
              fontFamily: FONTS.serif,
              fontSize,
              fontWeight: FONTS.light,
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`,
              display: "inline-block",
              color: isHighlighted ? "transparent" : COLORS.white,
              backgroundImage: isHighlighted ? GRADIENT.goldH : undefined,
              backgroundClip: isHighlighted ? "text" : undefined,
              WebkitBackgroundClip: isHighlighted ? "text" : undefined,
              WebkitTextFillColor: isHighlighted ? "transparent" : undefined,
              textShadow: isHighlighted ? "none" : SHADOW.text,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
