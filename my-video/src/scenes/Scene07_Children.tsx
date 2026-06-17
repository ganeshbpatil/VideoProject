import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep, ViralMomentBadge } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE, SPRING_BOUNCE } from "../constants/timing";

export const Scene07_Children: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const playItems = [
    { emoji: "🎠", x: 20, y: 55, size: 60, phase: 0 },
    { emoji: "⛲", x: 50, y: 60, size: 70, phase: 1 },
    { emoji: "🛝", x: 78, y: 52, size: 58, phase: 2 },
    { emoji: "🌈", x: 35, y: 30, size: 50, phase: 3 },
    { emoji: "🦋", x: 65, y: 28, size: 40, phase: 4 },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="children" zoom />
      <TopFade />
      <BottomFade />
      <LightSweep delay={0} color="rgba(100,180,100,0.12)" angle={25} duration={50} />

      {/* Playful elements */}
      {playItems.map((item, i) => {
        const s = spring({ frame: frame - i * 5, fps, config: SPRING_BOUNCE });
        const bounce = Math.abs(Math.sin(frame * 0.05 + item.phase)) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size,
              opacity: interpolate(s, [0, 1], [0, 0.5]),
              transform: `translateY(${-bounce + interpolate(s, [0, 1], [20, 0])}px)`,
              filter: "brightness(0.7) saturate(1.2)",
            }}
          >
            {item.emoji}
          </div>
        );
      })}

      {/* Ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: "linear-gradient(180deg, transparent 0%, rgba(26,48,32,0.8) 100%)",
          zIndex: 4,
        }}
      />

      {/* Content */}
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
        <ViralMomentBadge text="Your Children Deserve This" delay={5} />

        <KineticHeadline
          words={["A", "World", "Built", "For", "Them."]}
          delay={12}
          highlight={[2, 4]}
          fontSize={72}
        />

        <AnimatedCaption
          text="Dedicated kids' zones. Open spaces to run, imagine, and grow freely."
          delay={26}
          highlight={["kids'", "run", "grow"]}
          size="md"
        />

        {/* Child-friendly features */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 12,
          }}
        >
          {[
            { icon: "🎮", text: "Play Zone" },
            { icon: "🎨", text: "Art Corner" },
            { icon: "🏃", text: "Run Track" },
            { icon: "🌿", text: "Nature Walk" },
          ].map((feat, i) => {
            const s = spring({ frame: frame - 30 - i * 5, fps, config: SPRING_GENTLE });
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
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ fontSize: 28 }}>{feat.icon}</span>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 11,
                    fontWeight: FONTS.semibold,
                    letterSpacing: "0.12em",
                    color: COLORS.grayLight,
                    textTransform: "uppercase",
                  }}
                >
                  {feat.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

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
