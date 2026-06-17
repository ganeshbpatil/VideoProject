import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption, LocationReveal } from "../components/AnimatedCaption";
import { GlassMorphCard } from "../components/GlassMorphCard";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE, SPRING_SNAPPY } from "../constants/timing";

interface LocationPoint {
  label: string;
  distance: string;
  icon: string;
  delay: number;
}

const LOCATION_POINTS: LocationPoint[] = [
  { label: "Hinjewadi IT Hub", distance: "15 min", icon: "💼", delay: 20 },
  { label: "Baner", distance: "12 min", icon: "🏙️", delay: 26 },
  { label: "Mumbai Expressway", distance: "8 min", icon: "🛣️", delay: 32 },
  { label: "Pune Airport", distance: "30 min", icon: "✈️", delay: 38 },
  { label: "Top Schools", distance: "5 min", icon: "🏫", delay: 44 },
  { label: "Hospitals", distance: "10 min", icon: "🏥", delay: 50 },
];

export const Scene08_Location: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated map dot pulse
  const pulse1 = 1 + Math.sin(frame * 0.08) * 0.15;
  const pulse2 = 1 + Math.sin(frame * 0.08 + Math.PI) * 0.15;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="location" zoom={false} pan="none" />
      <TopFade />
      <BottomFade />
      <LightSweep delay={5} color="rgba(40,80,160,0.1)" angle={30} duration={70} />

      {/* Map-like grid overlay */}
      <AbsoluteFill style={{ zIndex: 4 }}>
        {/* Radial lines from center */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60%",
              height: 1,
              background: "rgba(201,168,76,0.04)",
              transformOrigin: "left center",
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}

        {/* Concentric circles */}
        {[80, 160, 260, 380].map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: r * 2,
              height: r * 2,
              border: "1px solid rgba(201,168,76,0.07)",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* Central location dot — SKYi Park */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: COLORS.gold,
              boxShadow: `0 0 ${30 * pulse1}px rgba(201,168,76,0.6)`,
              transform: `scale(${pulse1})`,
            }}
          />
          {/* Ripple */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 60 * pulse2,
              height: 60 * pulse2,
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.3)",
              opacity: 1 / pulse2,
            }}
          />
        </div>

        {/* Nearby destination dots */}
        {[
          { x: 30, y: 25, label: "Hinjewadi" },
          { x: 65, y: 35, label: "Baner" },
          { x: 20, y: 60, label: "Expressway" },
          { x: 72, y: 65, label: "Airport" },
        ].map((dot, i) => {
          const s = spring({ frame: frame - 25 - i * 8, fps, config: SPRING_SNAPPY });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `scale(${interpolate(s, [0, 1], [0, 1])})`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: COLORS.grayLight,
                  boxShadow: "0 0 8px rgba(255,255,255,0.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: FONTS.sans,
                  fontSize: 9,
                  color: COLORS.gray,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.1em",
                }}
              >
                {dot.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          gap: 40,
          zIndex: 20,
        }}
      >
        {/* Left: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 500,
          }}
        >
          <KineticHeadline
            words={["At", "The", "Heart", "Of", "Pune's", "Growth."]}
            delay={5}
            highlight={[4, 5]}
            fontSize={64}
            align="left"
          />

          <AnimatedCaption
            text="Mahalunge — where IT meets nature. The city's fastest-growing address."
            delay={25}
            highlight={["IT", "nature", "fastest-growing"]}
            size="md"
            align="left"
          />

          {/* Location points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            {LOCATION_POINTS.slice(0, 4).map((point, i) => {
              const s = spring({ frame: frame - point.delay, fps, config: SPRING_GENTLE });
              return (
                <div
                  key={i}
                  style={{
                    opacity: interpolate(s, [0, 1], [0, 1]),
                    transform: `translateX(${interpolate(s, [0, 1], [-20, 0])}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{point.icon}</span>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      fontWeight: FONTS.light,
                      color: COLORS.grayLight,
                      flex: 1,
                    }}
                  >
                    {point.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 13,
                      fontWeight: FONTS.semibold,
                      color: COLORS.gold,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {point.distance}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: glass card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassMorphCard
            title="Price Appreciation"
            subtitle="Year on Year · Hinjewadi Corridor"
            value="18%"
            delay={40}
            width={240}
          />
          <GlassMorphCard
            title="From Hinjewadi IT Hub"
            subtitle="Drive Time"
            value="15 min"
            delay={50}
            width={240}
          />
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
