import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_SNAPPY } from "../constants/timing";

interface AnimatedCaptionProps {
  text: string;
  delay?: number;
  highlight?: string[];
  size?: "lg" | "md" | "sm";
  align?: "left" | "center" | "right";
}

export const AnimatedCaption: React.FC<AnimatedCaptionProps> = ({
  text,
  delay = 0,
  highlight = [],
  size = "md",
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");
  const sizes = { lg: 28, md: 20, sm: 15 };
  const fontSize = sizes[size];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.3em",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        maxWidth: 800,
      }}
    >
      {words.map((word, i) => {
        const s = spring({ frame: frame - delay - i * 2, fps, config: SPRING_SNAPPY });
        const isHighlighted = highlight.some((h) => word.toLowerCase().includes(h.toLowerCase()));

        return (
          <span
            key={i}
            style={{
              fontFamily: FONTS.sans,
              fontSize,
              fontWeight: isHighlighted ? FONTS.semibold : FONTS.light,
              letterSpacing: "0.04em",
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)`,
              display: "inline-block",
              color: isHighlighted ? "transparent" : COLORS.grayLight,
              backgroundImage: isHighlighted ? GRADIENT.goldH : undefined,
              backgroundClip: isHighlighted ? "text" : undefined,
              WebkitBackgroundClip: isHighlighted ? "text" : undefined,
              WebkitTextFillColor: isHighlighted ? "transparent" : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

interface LocationRevealProps {
  location: string;
  detail: string;
  delay?: number;
}

export const LocationReveal: React.FC<LocationRevealProps> = ({ location, detail, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: SPRING_SNAPPY });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity: interpolate(s, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(s, [0, 1], [-20, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 4,
          height: 40,
          background: GRADIENT.goldV,
          borderRadius: 2,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            fontWeight: FONTS.semibold,
            letterSpacing: "0.2em",
            color: COLORS.gold,
            textTransform: "uppercase",
          }}
        >
          {location}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 11,
            fontWeight: FONTS.light,
            letterSpacing: "0.1em",
            color: COLORS.gray,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};
