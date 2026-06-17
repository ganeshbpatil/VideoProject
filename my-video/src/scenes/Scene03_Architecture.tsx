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

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Simulated architectural towers with CSS
  const towerData = [
    { x: "20%", w: 180, h: "72%", delay: 5, accentColor: "rgba(201,168,76,0.6)" },
    { x: "42%", w: 220, h: "88%", delay: 0, accentColor: "rgba(201,168,76,0.9)" },
    { x: "65%", w: 175, h: "68%", delay: 8, accentColor: "rgba(201,168,76,0.5)" },
  ];

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Real photo — upward tilt / zoom into towers */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center 70%",
            transform: `scale(${interpolate(frame, [0, durationInFrames], [1.05, 1.0])}) translateY(${interpolate(frame, [0, durationInFrames], [0, -4])}%)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,15,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,15,0.7) 0%, transparent 35%, rgba(5,5,15,0.9) 100%)" }} />
      </AbsoluteFill>
      <TopFade />
      <BottomFade />
      <LightSweep delay={10} color="rgba(201,168,76,0.07)" angle={-30} />

      {/* Architectural tower visualization */}
      <AbsoluteFill style={{ zIndex: 5 }}>
        {towerData.map((tower, i) => {
          const revealAnim = spring({ frame: frame - tower.delay, fps, config: { damping: 18, stiffness: 80, mass: 1 } });
          const towerH = interpolate(revealAnim, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "15%",
                left: tower.x,
                width: tower.w,
                height: tower.h,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "hidden",
              }}
            >
              {/* Tower body */}
              <div
                style={{
                  width: "100%",
                  height: `${towerH * 100}%`,
                  background: i === 1
                    ? "linear-gradient(180deg, rgba(50,60,90,0.95) 0%, rgba(30,40,65,0.98) 100%)"
                    : "linear-gradient(180deg, rgba(40,50,75,0.85) 0%, rgba(25,35,55,0.9) 100%)",
                  borderRadius: "6px 6px 0 0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Floor lines */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent calc(${100 / 15}% - 1px), rgba(201,168,76,0.12) calc(${100 / 15}% - 1px), rgba(201,168,76,0.12) ${100 / 15}%)`,
                  }}
                />
                {/* Vertical accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: 2,
                    background: `linear-gradient(180deg, ${tower.accentColor}, transparent)`,
                  }}
                />
                {/* Window grid */}
                <div
                  style={{
                    position: "absolute",
                    inset: "8px 12px",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 4,
                    alignContent: "start",
                    paddingTop: 10,
                  }}
                >
                  {Array.from({ length: 60 }).map((_, wi) => (
                    <div
                      key={wi}
                      style={{
                        height: 8,
                        background: wi % 7 === 0
                          ? "rgba(201,168,76,0.5)"
                          : wi % 3 === 0
                          ? "rgba(150,200,255,0.3)"
                          : "rgba(200,220,255,0.15)",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>
              </div>
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
            height: "16%",
            background: "linear-gradient(180deg, #1a3020 0%, #0d1a10 100%)",
          }}
        />

        {/* Palm trees */}
        {[25, 38, 55, 70, 82].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "14%",
              left: `${pos}%`,
              fontSize: 40 + (i % 3) * 10,
              filter: "brightness(0.6)",
              zIndex: 8,
            }}
          >
            🌴
          </div>
        ))}
      </AbsoluteFill>

      {/* Text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 80px 80px",
          gap: 20,
          zIndex: 20,
        }}
      >
        <KineticHeadline
          words={["Iconic", "Architecture.", "Timeless", "Living."]}
          delay={20}
          highlight={[0, 2]}
          fontSize={72}
        />
        <AnimatedCaption
          text={`${towerData.length} towers · 15 floors · ${15} lush acres`}
          delay={35}
          highlight={["towers", "floors", "acres"]}
          size="md"
        />
      </AbsoluteFill>

      {/* Vignette */}
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
