import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

interface LuxuryCounterProps {
  stats: Stat[];
  delay?: number;
}

export const LuxuryCounter: React.FC<LuxuryCounterProps> = ({ stats, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        gap: 60,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {stats.map((stat, i) => {
        const s = spring({ frame: frame - delay - i * 8, fps, config: SPRING_GENTLE });
        const opacity = interpolate(s, [0, 1], [0, 1]);
        const translateY = interpolate(s, [0, 1], [20, 0]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.serif,
                fontSize: 72,
                fontWeight: FONTS.thin,
                lineHeight: 1,
                color: "transparent",
                backgroundImage: GRADIENT.goldH,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
              {stat.suffix && (
                <span style={{ fontSize: 36, fontWeight: FONTS.light }}>{stat.suffix}</span>
              )}
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 13,
                fontWeight: FONTS.medium,
                letterSpacing: "0.18em",
                color: COLORS.gray,
                textTransform: "uppercase",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {stat.label}
            </div>
            {i < stats.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: -30,
                  top: "50%",
                  width: 1,
                  height: 50,
                  background: COLORS.glassBorder,
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
