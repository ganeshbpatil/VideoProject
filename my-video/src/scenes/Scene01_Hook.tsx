import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { TopFade, BottomFade } from "../components/CinematicBackground";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE, SPRING_SNAPPY } from "../constants/timing";
import { PROJECT } from "../constants/config";

interface Scene01Props {
  hookText?: string;
}

// Reusable photo background with Ken Burns
const ProjectPhoto: React.FC<{
  scale?: [number, number];
  translateX?: [number, number];
  translateY?: [number, number];
  objectPosition?: string;
  overlayOpacity?: number;
}> = ({
  scale = [1.1, 1.0],
  translateX = [0, 0],
  translateY = [0, -3],
  objectPosition = "center 40%",
  overlayOpacity = 0.62,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;

  const s = interpolate(p, [0, 1], scale);
  const tx = interpolate(p, [0, 1], translateX);
  const ty = interpolate(p, [0, 1], translateY);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("skyipark-main.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          transform: `scale(${s}) translate(${tx}%, ${ty}%)`,
        }}
      />
      {/* Dark cinematic overlay */}
      <div style={{ position: "absolute", inset: 0, background: `rgba(6,6,10,${overlayOpacity})` }} />
      {/* Gold-tinted colour grade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(8,14,8,0.4) 0%, transparent 60%)" }} />
    </AbsoluteFill>
  );
};

export { ProjectPhoto };

export const Scene01_Hook: React.FC<Scene01Props> = ({
  hookText = "What if your home felt less like a house\n— and more like a destination?",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const lines = hookText.split("\n");

  const dots = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 37 + 10) % 100, y: (i * 53 + 5) % 100,
    size: 1 + (i % 3), opacity: 0.2 + (i % 4) * 0.08,
    speed: 0.5 + (i % 3) * 0.3,
  }));

  const fadeIn = spring({ frame, fps, config: SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <ProjectPhoto scale={[1.12, 1.0]} translateX={[0, -2]} objectPosition="center 35%" overlayOpacity={0.6} />
      <TopFade />
      <BottomFade />
      <LightSweep delay={5} duration={40} color="rgba(201,168,76,0.12)" />

      {/* Particle dots */}
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${d.x + Math.sin(frame * 0.012 * d.speed + i) * 1.5}%`,
          top: `${d.y + Math.cos(frame * 0.008 * d.speed + i) * 1}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          background: COLORS.gold,
          opacity: d.opacity * interpolate(fadeIn, [0, 1], [0, 1]),
        }} />
      ))}

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 48px", gap: 32, zIndex: 20,
      }}>
        {/* Developer badge */}
        <div style={{
          opacity: interpolate(spring({ frame: frame - 8, fps, config: SPRING_SNAPPY }), [0, 1], [0, 1]),
          transform: `translateY(${interpolate(spring({ frame: frame - 8, fps, config: SPRING_SNAPPY }), [0, 1], [-15, 0])}px)`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 11, fontWeight: FONTS.semibold,
            letterSpacing: "0.42em", color: COLORS.gold, textTransform: "uppercase",
          }}>{PROJECT.developer}</div>
          <div style={{ width: 50, height: 1, background: GRADIENT.goldH }} />
        </div>

        {/* Hook lines */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          {lines.map((line, i) => {
            const s = spring({ frame: frame - 14 - i * 10, fps, config: SPRING_GENTLE });
            return (
              <div key={i} style={{
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`,
                fontFamily: FONTS.serif,
                fontSize: 52,
                fontWeight: FONTS.thin,
                lineHeight: 1.18,
                letterSpacing: "0.015em",
                color: COLORS.white,
                textShadow: SHADOW.text,
                textAlign: "center",
              }}>{line}</div>
            );
          })}
        </div>

        {/* Gold line */}
        <div style={{
          opacity: interpolate(spring({ frame: frame - 30, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          transform: `scaleX(${interpolate(spring({ frame: frame - 30, fps, config: SPRING_GENTLE }), [0, 1], [0, 1])})`,
          transformOrigin: "center",
          width: 80, height: 1, background: GRADIENT.goldH,
        }} />

        {/* Location tag */}
        <div style={{
          opacity: interpolate(spring({ frame: frame - 36, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          fontFamily: FONTS.sans, fontSize: 12, fontWeight: FONTS.medium,
          letterSpacing: "0.32em", color: COLORS.gold, textTransform: "uppercase",
        }}>{PROJECT.locationShort}</div>
      </AbsoluteFill>

      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 180px rgba(0,0,0,0.65)",
        pointerEvents: "none", zIndex: 15,
      }} />
    </AbsoluteFill>
  );
};
