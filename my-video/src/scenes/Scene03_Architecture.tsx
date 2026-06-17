import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Img, staticFile } from "remotion";
import { BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

export const Scene03_Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const p = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Photo — slow upward tilt revealing towers */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "100%",
            height: "120%",
            objectFit: "cover",
            objectPosition: "center 65%",
            transform: `scale(${interpolate(p, [0, 1], [1.06, 1.0])}) translateY(${interpolate(p, [0, 1], [0, -5])}%)`,
          }}
        />
        {/* Blue-night grade */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,18,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,18,0.7) 0%, rgba(5,8,18,0.3) 40%, rgba(5,8,18,0.9) 100%)" }} />
        {/* Subtle gold vignette on towers */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      </AbsoluteFill>

      <TopFade />
      <BottomFade />
      <LightSweep delay={8} color="rgba(201,168,76,0.08)" angle={-30} duration={60} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        padding: "0 52px 100px", gap: 18, zIndex: 20,
      }}>
        <KineticHeadline
          words={["Iconic", "Architecture.", "Timeless", "Living."]}
          delay={15} highlight={[0, 2]} fontSize={60}
        />
        <AnimatedCaption
          text="3 towers · 15 floors · 15 lush acres"
          delay={30} highlight={["towers", "floors", "acres"]} size="md"
        />
      </AbsoluteFill>

      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)",
        pointerEvents: "none", zIndex: 15,
      }} />
    </AbsoluteFill>
  );
};
