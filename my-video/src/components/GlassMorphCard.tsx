import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

interface GlassMorphCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  delay?: number;
  width?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

export const GlassMorphCard: React.FC<GlassMorphCardProps> = ({
  title,
  subtitle,
  value,
  delay = 0,
  width = 260,
  position = "bottom-right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: SPRING_GENTLE });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translateX = interpolate(
    s,
    [0, 1],
    [position.includes("right") ? 40 : -40, 0]
  );
  const translateY = interpolate(
    s,
    [0, 1],
    [position.includes("bottom") ? 20 : -20, 0]
  );

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        width,
        background: "rgba(12,12,12,0.72)",
        border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: 16,
        padding: "18px 22px",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {value && (
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 38,
            fontWeight: FONTS.thin,
            color: "transparent",
            backgroundImage: GRADIENT.goldH,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
      )}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 14,
          fontWeight: FONTS.semibold,
          color: COLORS.white,
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 11,
            fontWeight: FONTS.light,
            color: COLORS.gray,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
