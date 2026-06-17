import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { HeroText } from "../components/HeroText";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep, ViralMomentBadge } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

export const Scene04_Lifestyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Floating lifestyle elements
  const floatItems = [
    { emoji: "☀️", x: 15, y: 25, size: 48, phase: 0 },
    { emoji: "🌿", x: 82, y: 18, size: 44, phase: 1 },
    { emoji: "☕", x: 12, y: 72, size: 40, phase: 2 },
    { emoji: "🏊", x: 85, y: 65, size: 46, phase: 3 },
    { emoji: "🌅", x: 50, y: 10, size: 42, phase: 4 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="lifestyle" zoom pan="right" />
      <TopFade />
      <BottomFade />
      <LightSweep delay={0} color="rgba(74,139,76,0.15)" angle={20} duration={50} />

      {/* Floating emoji lifestyle icons */}
      {floatItems.map((item, i) => {
        const s = spring({ frame: frame - i * 5, fps, config: SPRING_GENTLE });
        const floatY = Math.sin(frame * 0.025 + item.phase * 1.2) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size,
              opacity: interpolate(s, [0, 1], [0, 0.35]),
              transform: `translateY(${floatY}px)`,
              filter: "blur(0.5px)",
            }}
          >
            {item.emoji}
          </div>
        );
      })}

      {/* Sunrise / golden hour visual */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(180deg, transparent 0%, rgba(44,95,46,0.3) 50%, rgba(26,61,28,0.6) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)",
          }}
        />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          zIndex: 20,
          padding: "0 80px",
        }}
      >
        {/* Viral moment badge */}
        <div style={{ marginBottom: 8 }}>
          <ViralMomentBadge text="Wake Up To Nature" delay={5} />
        </div>

        <HeroText
          line1="Every Morning,"
          line2="A New Reason"
          line3="To Stay."
          delay={10}
          size="xl"
          align="center"
          gold={false}
        />

        <AnimatedCaption
          text="Sunrise views. Fresh air. Your private oasis — every single day."
          delay={28}
          highlight={["Sunrise", "private", "oasis"]}
          size="md"
        />

        {/* Lifestyle pillars */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 16,
          }}
        >
          {["Serenity", "Luxury", "Nature", "Community"].map((pillar, i) => {
            const s = spring({ frame: frame - 35 - i * 6, fps, config: SPRING_GENTLE });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [15, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 1,
                    height: 28,
                    background: GRADIENT.goldV,
                  }}
                />
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    fontWeight: FONTS.semibold,
                    letterSpacing: "0.2em",
                    color: COLORS.gold,
                    textTransform: "uppercase",
                  }}
                >
                  {pillar}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.55)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </AbsoluteFill>
  );
};
