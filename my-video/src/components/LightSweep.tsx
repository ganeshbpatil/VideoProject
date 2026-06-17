import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface LightSweepProps {
  delay?: number;
  duration?: number;
  color?: string;
  angle?: number;
}

export const LightSweep: React.FC<LightSweepProps> = ({
  delay = 0,
  duration = 30,
  color = "rgba(201,168,76,0.12)",
  angle = -25,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, duration], [-150, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${progress}%`,
          width: "60%",
          background: `linear-gradient(${angle}deg, transparent 30%, ${color} 50%, transparent 70%)`,
          transform: "skewX(-20deg)",
        }}
      />
    </div>
  );
};

interface GoldLineProps {
  delay?: number;
  width?: string;
}

export const GoldLine: React.FC<GoldLineProps> = ({ delay = 0, width = "120px" }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height: 1,
        background: "linear-gradient(90deg, #8B6914, #E8D480, #C9A84C)",
        opacity: progress,
        transform: `scaleX(${progress})`,
        transformOrigin: "left",
      }}
    />
  );
};

interface ViralMomentBadgeProps {
  text: string;
  delay?: number;
}

export const ViralMomentBadge: React.FC<ViralMomentBadgeProps> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = Math.sin(frame * 0.08) * 0.025 + 1;

  return (
    <div
      style={{
        opacity: s,
        transform: `scale(${s * pulse})`,
        background: "linear-gradient(135deg, #C9A84C, #8B6914)",
        borderRadius: 100,
        padding: "10px 28px",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.2em",
        color: "#080808",
        textTransform: "uppercase",
        boxShadow: "0 4px 24px rgba(201,168,76,0.5)",
      }}
    >
      {text}
    </div>
  );
};
