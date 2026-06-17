import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Img, staticFile } from "remotion";
import { BottomFade } from "../components/CinematicBackground";
import { LightSweep, GoldLine } from "../components/LightSweep";
import { GlassMorphCard } from "../components/GlassMorphCard";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";
import { PROJECT } from "../constants/config";

export const Scene02_AerialReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleAnim = spring({ frame: frame - 10, fps, config: SPRING_GENTLE });
  const scale = interpolate(frame, [0, durationInFrames], [1.12, 1.0]);

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Real photo — slow rightward pan reveal */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "110%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 55%",
            transform: `translateX(${interpolate(frame, [0, durationInFrames], [-5, 0])}%)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.55)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,8,8,0.6) 0%, transparent 40%, rgba(8,8,8,0.85) 100%)" }} />
      </AbsoluteFill>

      {/* Sky gradient with simulated towers */}
      <AbsoluteFill>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})` }}>
          {/* Simulated building silhouettes */}
          {[
            { left: "18%", width: 160, height: "68%", bg: "rgba(30,50,70,0.9)" },
            { left: "38%", width: 200, height: "80%", bg: "rgba(35,55,75,0.95)" },
            { left: "60%", width: 140, height: "65%", bg: "rgba(30,50,70,0.85)" },
            { left: "75%", width: 120, height: "55%", bg: "rgba(25,45,65,0.7)" },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "12%",
                left: b.left,
                width: b.width,
                height: b.height,
                background: b.bg,
                borderRadius: "4px 4px 0 0",
              }}
            >
              {/* Windows */}
              <div
                style={{
                  position: "absolute",
                  inset: 8,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 6,
                  alignContent: "start",
                  paddingTop: 16,
                }}
              >
                {Array.from({ length: 32 }).map((_, wi) => (
                  <div
                    key={wi}
                    style={{
                      height: 10,
                      background: Math.random() > 0.5
                        ? "rgba(201,168,76,0.4)"
                        : "rgba(150,200,255,0.2)",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Ground greenery */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "15%",
              background: "linear-gradient(180deg, #1a3d1c 0%, #0d2010 100%)",
            }}
          />
        </div>
      </AbsoluteFill>

      <BottomFade />
      <LightSweep delay={5} color="rgba(201,168,76,0.08)" duration={40} />

      {/* Content overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 80px 100px",
          gap: 24,
          zIndex: 20,
        }}
      >
        <div
          style={{
            opacity: interpolate(titleAnim, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleAnim, [0, 1], [20, 0])}px)`,
          }}
        >
          <GoldLine delay={5} width="80px" />
        </div>

        <div
          style={{
            opacity: interpolate(titleAnim, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleAnim, [0, 1], [30, 0])}px)`,
            fontFamily: FONTS.serif,
            fontSize: 80,
            fontWeight: FONTS.thin,
            lineHeight: 1.0,
            letterSpacing: "0.02em",
            color: COLORS.white,
            textShadow: SHADOW.text,
          }}
        >
          {PROJECT.name}
        </div>

        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 18, fps, config: SPRING_GENTLE }),
              [0, 1], [0, 1]
            ),
            fontFamily: FONTS.sans,
            fontSize: 15,
            fontWeight: FONTS.light,
            letterSpacing: "0.28em",
            color: COLORS.grayLight,
            textTransform: "uppercase",
          }}
        >
          {PROJECT.locationShort}
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 12,
            opacity: interpolate(
              spring({ frame: frame - 25, fps, config: SPRING_GENTLE }),
              [0, 1], [0, 1]
            ),
          }}
        >
          {[
            { value: PROJECT.acres, label: "Acres" },
            { value: PROJECT.towers, label: "Towers" },
            { value: PROJECT.floors, label: "Floors" },
            { value: PROJECT.totalUnits, label: "Homes" },
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontFamily: FONTS.serif,
                  fontSize: 42,
                  fontWeight: FONTS.thin,
                  color: "transparent",
                  backgroundImage: GRADIENT.goldH,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 11,
                  fontWeight: FONTS.medium,
                  letterSpacing: "0.2em",
                  color: COLORS.gray,
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Corner glass card */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          zIndex: 30,
        }}
      >
        <GlassMorphCard
          title={PROJECT.possession}
          subtitle="Occupancy Status"
          value="✓"
          delay={20}
          width={200}
        />
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0,0,0,0.5)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </AbsoluteFill>
  );
};
