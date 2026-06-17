import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../constants/theme";

interface CinematicBgProps {
  variant:
    | "hero"
    | "aerial"
    | "architecture"
    | "lifestyle"
    | "green"
    | "clubhouse"
    | "fitness"
    | "children"
    | "community"
    | "location"
    | "appreciation"
    | "cta";
  zoom?: boolean;
  pan?: "left" | "right" | "none";
}

const VARIANTS: Record<string, { bg: string; overlay: string }> = {
  hero: {
    bg: "linear-gradient(160deg, #0a1628 0%, #1a2a1a 40%, #0d1f0d 70%, #080808 100%)",
    overlay: "radial-gradient(ellipse at 30% 40%, rgba(44,95,46,0.3) 0%, transparent 60%)",
  },
  aerial: {
    bg: "linear-gradient(180deg, #1a3a4a 0%, #0d2030 40%, #0a1520 100%)",
    overlay: "radial-gradient(ellipse at 60% 20%, rgba(201,168,76,0.15) 0%, transparent 50%)",
  },
  architecture: {
    bg: "linear-gradient(150deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)",
    overlay: "radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.1) 0%, transparent 60%)",
  },
  lifestyle: {
    bg: "linear-gradient(180deg, #0a1a10 0%, #122a18 50%, #0d1f12 100%)",
    overlay: "radial-gradient(ellipse at 70% 30%, rgba(74,139,76,0.35) 0%, transparent 60%)",
  },
  green: {
    bg: "linear-gradient(160deg, #0d240f 0%, #1a3d1c 50%, #0a1a0c 100%)",
    overlay: "radial-gradient(ellipse at 40% 50%, rgba(44,95,46,0.5) 0%, transparent 65%)",
  },
  clubhouse: {
    bg: "linear-gradient(135deg, #1a1400 0%, #2d2200 50%, #1a1a00 100%)",
    overlay: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.2) 0%, transparent 60%)",
  },
  fitness: {
    bg: "linear-gradient(160deg, #0a0a15 0%, #15151a 50%, #0a0a0a 100%)",
    overlay: "radial-gradient(ellipse at 30% 30%, rgba(80,80,180,0.2) 0%, transparent 60%)",
  },
  children: {
    bg: "linear-gradient(180deg, #0a1a10 0%, #1a3020 50%, #0d1f12 100%)",
    overlay: "radial-gradient(ellipse at 50% 40%, rgba(100,180,100,0.3) 0%, transparent 60%)",
  },
  community: {
    bg: "linear-gradient(150deg, #10100a 0%, #1a1a10 50%, #0d0d0a 100%)",
    overlay: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.15) 0%, transparent 60%)",
  },
  location: {
    bg: "linear-gradient(180deg, #0a1020 0%, #10182a 50%, #0a0f18 100%)",
    overlay: "radial-gradient(ellipse at 40% 60%, rgba(40,80,160,0.3) 0%, transparent 60%)",
  },
  appreciation: {
    bg: "linear-gradient(160deg, #100a00 0%, #2a1a00 50%, #1a1000 100%)",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.25) 0%, transparent 60%)",
  },
  cta: {
    bg: "linear-gradient(160deg, #050505 0%, #0d0d0d 50%, #080808 100%)",
    overlay: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.18) 0%, transparent 65%)",
  },
};

// Particle-like floating orbs for depth
const Orbs: React.FC<{ variant: string }> = ({ variant }) => {
  const frame = useCurrentFrame();

  const orbs = [
    { x: 15, y: 20, size: 300, opacity: 0.06, speed: 0.0008, phase: 0 },
    { x: 80, y: 70, size: 400, opacity: 0.05, speed: 0.0012, phase: 1 },
    { x: 50, y: 40, size: 200, opacity: 0.04, speed: 0.001, phase: 2 },
    { x: 30, y: 80, size: 250, opacity: 0.07, speed: 0.0006, phase: 3 },
  ];

  const isGold = ["clubhouse", "appreciation", "cta", "community"].includes(variant);
  const orbColor = isGold ? "201,168,76" : "44,95,46";

  return (
    <>
      {orbs.map((orb, i) => {
        const driftX = Math.sin(frame * orb.speed + orb.phase) * 3;
        const driftY = Math.cos(frame * orb.speed * 0.7 + orb.phase) * 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${orb.x + driftX}%`,
              top: `${orb.y + driftY}%`,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, rgba(${orbColor},${orb.opacity}) 0%, transparent 70%)`,
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// Architectural grid lines overlay
const ArchGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(201,168,76,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      pointerEvents: "none",
    }}
  />
);

export const CinematicBackground: React.FC<CinematicBgProps> = ({
  variant,
  zoom = true,
  pan = "none",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const v = VARIANTS[variant] || VARIANTS.hero;
  const progress = frame / durationInFrames;

  const scale = zoom ? interpolate(progress, [0, 1], [1.0, 1.08]) : 1;
  const panX = pan === "left"
    ? interpolate(progress, [0, 1], [0, -3])
    : pan === "right"
    ? interpolate(progress, [0, 1], [0, 3])
    : 0;

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: v.bg,
          transform: `scale(${scale}) translateX(${panX}%)`,
        }}
      />
      {/* Radial overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: v.overlay,
        }}
      />
      {/* Floating orbs */}
      <Orbs variant={variant} />
      {/* Subtle grid */}
      <ArchGrid opacity={0.025} />
    </AbsoluteFill>
  );
};

// Cinematic letterbox bars
export const CinematicBars: React.FC<{ height?: number }> = ({ height = 60 }) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        background: "#000",
        zIndex: 100,
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height,
        background: "#000",
        zIndex: 100,
      }}
    />
  </>
);

// Dark gradient overlays for text legibility
export const TopFade: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "50%",
      background: "linear-gradient(180deg, rgba(8,8,8,0.8) 0%, transparent 100%)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

export const BottomFade: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "55%",
      background: "linear-gradient(0deg, rgba(8,8,8,0.95) 0%, transparent 100%)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);
