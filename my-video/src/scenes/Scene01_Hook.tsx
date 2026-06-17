import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { BottomFade, TopFade } from "../components/CinematicBackground";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE, SPRING_SNAPPY } from "../constants/timing";
import { PROJECT } from "../constants/config";

interface Scene01Props {
  hookText?: string;
}

export const Scene01_Hook: React.FC<Scene01Props> = ({
  hookText = "What if your home felt less like a house\n— and more like a destination?",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = spring({ frame, fps, config: SPRING_GENTLE });
  const logoAnim = spring({ frame: frame - 15, fps, config: SPRING_SNAPPY });
  const textAnim = spring({ frame: frame - 8, fps, config: SPRING_GENTLE });

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lines = hookText.split("\n");

  // Particle dots
  const dots = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 37 + 10) % 100,
    y: (i * 53 + 5) % 100,
    size: 1 + (i % 3),
    opacity: 0.15 + (i % 4) * 0.08,
    speed: 0.5 + (i % 3) * 0.3,
  }));

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Real project photo — slow Ken Burns zoom */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
            transform: `scale(${interpolate(frame, [0, durationInFrames], [1.08, 1.0])}) translateX(${interpolate(frame, [0, durationInFrames], [0, -2])}%)`,
          }}
        />
        {/* Deep cinematic colour grade overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.62)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,15,0.5) 0%, transparent 60%)" }} />
      </AbsoluteFill>
      <TopFade />
      <BottomFade />
      <LightSweep delay={5} duration={35} color="rgba(201,168,76,0.1)" />

      {/* Particle field */}
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${d.x + Math.sin(frame * 0.012 * d.speed + i) * 1.5}%`,
            top: `${d.y + Math.cos(frame * 0.008 * d.speed + i) * 1}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: COLORS.gold,
            opacity: d.opacity * interpolate(fadeIn, [0, 1], [0, 1]),
          }}
        />
      ))}

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 40,
          zIndex: 20,
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            opacity: interpolate(logoAnim, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoAnim, [0, 1], [-20, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 12,
              fontWeight: FONTS.semibold,
              letterSpacing: "0.4em",
              color: COLORS.gold,
              textTransform: "uppercase",
            }}
          >
            {PROJECT.developer}
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background: GRADIENT.goldH,
            }}
          />
        </div>

        {/* Hook lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          {lines.map((line, i) => {
            const lineAnim = spring({ frame: frame - 12 - i * 8, fps, config: SPRING_GENTLE });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(lineAnim, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(lineAnim, [0, 1], [30, 0])}px)`,
                  fontFamily: FONTS.serif,
                  fontSize: 68,
                  fontWeight: FONTS.thin,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  color: COLORS.white,
                  textShadow: SHADOW.text,
                  textAlign: "center",
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Gold accent line */}
        <div
          style={{
            opacity: interpolate(textAnim, [0, 1], [0, 1]),
            transform: `scaleX(${interpolate(textAnim, [0, 1], [0, 1])})`,
            transformOrigin: "center",
            width: 100,
            height: 1,
            background: GRADIENT.goldH,
          }}
        />

        {/* Location tag */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 25, fps, config: SPRING_GENTLE }),
              [0, 1],
              [0, 1]
            ),
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: FONTS.medium,
            letterSpacing: "0.3em",
            color: COLORS.gold,
            textTransform: "uppercase",
          }}
        >
          {PROJECT.locationShort}
        </div>
      </AbsoluteFill>

      {/* Cinematic vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.7)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </AbsoluteFill>
  );
};
