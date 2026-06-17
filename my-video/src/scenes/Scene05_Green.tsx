import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep, ViralMomentBadge } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

export const Scene05_Green: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated tree silhouettes
  const trees = [
    { x: 5, size: 90, phase: 0 },
    { x: 12, size: 110, phase: 1 },
    { x: 22, size: 95, phase: 2 },
    { x: 72, size: 100, phase: 3 },
    { x: 82, size: 85, phase: 4 },
    { x: 91, size: 105, phase: 5 },
    { x: 40, size: 80, phase: 6 },
    { x: 58, size: 92, phase: 7 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="green" zoom pan="left" />
      <TopFade />
      <BottomFade />
      <LightSweep delay={0} color="rgba(44,95,46,0.2)" angle={15} duration={60} />

      {/* Nature forest layer */}
      <AbsoluteFill style={{ zIndex: 4 }}>
        {/* Ground */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(180deg, transparent 0%, rgba(13,36,16,0.9) 60%, #080f09 100%)",
          }}
        />

        {/* Trees */}
        {trees.map((tree, i) => {
          const sway = Math.sin(frame * 0.018 + tree.phase * 0.8) * 1.5;
          const s = spring({ frame: frame - i * 3, fps, config: SPRING_GENTLE });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "18%",
                left: `${tree.x}%`,
                fontSize: tree.size,
                opacity: interpolate(s, [0, 1], [0, 0.7]),
                transform: `rotate(${sway}deg) translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
                transformOrigin: "bottom center",
                filter: "brightness(0.5) saturate(1.5)",
              }}
            >
              🌳
            </div>
          );
        })}

        {/* Floating leaves */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (frame * (0.3 + i * 0.05) + i * 80) % 100;
          const y = 20 + Math.sin(frame * 0.02 + i) * 30;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                fontSize: 16 + (i % 3) * 6,
                opacity: 0.3 + (i % 4) * 0.05,
                transform: `rotate(${frame * 2 + i * 30}deg)`,
              }}
            >
              🍃
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          zIndex: 20,
          padding: "0 80px",
        }}
      >
        <ViralMomentBadge text="Pune's Greenest Lifestyle" delay={5} />

        <KineticHeadline
          words={["3", "Acres.", "Breathe", "Different."]}
          delay={12}
          highlight={[0, 2]}
          fontSize={76}
        />

        <AnimatedCaption
          text="Manicured gardens. Jogging trails. Spaces that restore your soul — not drain it."
          delay={26}
          highlight={["gardens", "trails", "soul"]}
          size="md"
        />

        {/* Green stats */}
        <div
          style={{
            display: "flex",
            gap: 50,
            marginTop: 12,
          }}
        >
          {[
            { val: "3+", label: "Acres Green" },
            { val: "40%", label: "Open Space" },
            { val: "500+", label: "Trees" },
          ].map((stat, i) => {
            const s = spring({ frame: frame - 30 - i * 8, fps, config: SPRING_GENTLE });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [15, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.serif,
                    fontSize: 48,
                    fontWeight: FONTS.thin,
                    color: "transparent",
                    backgroundImage: GRADIENT.goldH,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    fontWeight: FONTS.medium,
                    letterSpacing: "0.18em",
                    color: COLORS.gray,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.6)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </AbsoluteFill>
  );
};
