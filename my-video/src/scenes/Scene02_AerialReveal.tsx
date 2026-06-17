import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Img, staticFile } from "remotion";
import { BottomFade, TopFade } from "../components/CinematicBackground";
import { LightSweep, GoldLine } from "../components/LightSweep";
import { GlassMorphCard } from "../components/GlassMorphCard";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";
import { PROJECT } from "../constants/config";

export const Scene02_AerialReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const p = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Real photo — slow rightward pan, push up slightly */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "130%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 45%",
            transform: `translateX(${interpolate(p, [0, 1], [-10, 0])}%) scale(${interpolate(p, [0, 1], [1.08, 1.0])})`,
          }}
        />
        {/* Multi-layer cinematic grade */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,12,0.58)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,8,12,0.75) 0%, transparent 45%, rgba(6,8,12,0.92) 100%)" }} />
        {/* Golden hour tint */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
      </AbsoluteFill>

      <TopFade />
      <BottomFade />
      <LightSweep delay={5} color="rgba(201,168,76,0.09)" duration={50} />

      {/* Bottom content */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 52px 110px",
        gap: 20, zIndex: 20,
      }}>
        <div style={{
          opacity: interpolate(spring({ frame: frame - 8, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
        }}>
          <GoldLine delay={5} width="70px" />
        </div>

        <div style={{
          opacity: interpolate(spring({ frame: frame - 12, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          transform: `translateY(${interpolate(spring({ frame: frame - 12, fps, config: SPRING_GENTLE }), [0, 1], [25, 0])}px)`,
          fontFamily: FONTS.serif, fontSize: 68, fontWeight: FONTS.thin,
          lineHeight: 1.0, letterSpacing: "0.02em",
          color: COLORS.white, textShadow: SHADOW.text,
        }}>{PROJECT.name}</div>

        <div style={{
          opacity: interpolate(spring({ frame: frame - 20, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          fontFamily: FONTS.sans, fontSize: 12, fontWeight: FONTS.light,
          letterSpacing: "0.3em", color: COLORS.grayLight, textTransform: "uppercase",
        }}>{PROJECT.locationShort}</div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 36, marginTop: 8,
          opacity: interpolate(spring({ frame: frame - 28, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
        }}>
          {[
            { value: PROJECT.acres, label: "Acres" },
            { value: PROJECT.towers, label: "Towers" },
            { value: PROJECT.floors, label: "Floors" },
            { value: PROJECT.totalUnits, label: "Homes" },
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 36, fontWeight: FONTS.thin,
                color: "transparent", backgroundImage: GRADIENT.goldH,
                backgroundClip: "text", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent", lineHeight: 1,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: FONTS.sans, fontSize: 9, fontWeight: FONTS.medium,
                letterSpacing: "0.2em", color: COLORS.gray, textTransform: "uppercase",
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Glass card top-right */}
      <div style={{ position: "absolute", top: 80, right: 48, zIndex: 30 }}>
        <GlassMorphCard title={PROJECT.possession} subtitle="Occupancy" value="✓" delay={22} width={180} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 180px rgba(0,0,0,0.5)",
        pointerEvents: "none", zIndex: 15,
      }} />
    </AbsoluteFill>
  );
};
