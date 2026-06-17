import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

interface AmenityCardProps {
  icon: string;
  label: string;
  index: number;
  delay?: number;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({ icon, label, index, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay - index * 4, fps, config: SPRING_GENTLE });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(201,168,76,0.25)",
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        backdropFilter: "blur(12px)",
        minWidth: 120,
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span
        style={{
          fontFamily: FONTS.sans,
          fontSize: 11,
          fontWeight: FONTS.semibold,
          letterSpacing: "0.12em",
          color: COLORS.grayLight,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
};

interface AmenityGridProps {
  amenities: { icon: string; label: string }[];
  delay?: number;
}

export const AmenityGrid: React.FC<AmenityGridProps> = ({ amenities, delay = 0 }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "center",
      maxWidth: 700,
    }}
  >
    {amenities.map((a, i) => (
      <AmenityCard key={i} icon={a.icon} label={a.label} index={i} delay={delay} />
    ))}
  </div>
);
