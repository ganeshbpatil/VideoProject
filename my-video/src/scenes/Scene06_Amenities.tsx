import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { AmenityGrid } from "../components/AmenityCard";
import { KineticHeadline } from "../components/KineticHeadline";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";
import { AMENITIES } from "../constants/config";

export const Scene06_Amenities: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pool water ripple effect
  const rippleScale = 1 + Math.sin(frame * 0.04) * 0.02;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="clubhouse" zoom />
      <TopFade />
      <BottomFade />
      <LightSweep delay={0} color="rgba(201,168,76,0.1)" angle={-20} duration={60} />

      {/* Infinity pool simulation */}
      <AbsoluteFill style={{ zIndex: 4 }}>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: `translate(-50%,0) scale(${rippleScale})`,
            width: "70%",
            height: "25%",
            background: "linear-gradient(180deg, rgba(30,80,140,0.7) 0%, rgba(20,60,110,0.9) 100%)",
            borderRadius: "50% 50% 0 0 / 20% 20% 0 0",
            boxShadow: "0 0 80px rgba(30,80,180,0.3)",
          }}
        >
          {/* Water ripple lines */}
          {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${pos * 100}%`,
                left: "10%",
                right: "10%",
                height: 1,
                background: "rgba(200,230,255,0.15)",
                transform: `scaleX(${0.8 + Math.sin(frame * 0.05 + i) * 0.1})`,
                borderRadius: "50%",
              }}
            />
          ))}
          {/* Sky reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "40%",
              background: "linear-gradient(180deg, rgba(201,168,76,0.2) 0%, transparent 100%)",
              borderRadius: "0 0 50% 50%",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          zIndex: 20,
          padding: "0 60px",
        }}
      >
        <KineticHeadline
          words={["World-Class", "Amenities.", "Resort-Style", "Living."]}
          delay={5}
          highlight={[0, 2]}
          fontSize={68}
        />

        <div
          style={{
            width: 80,
            height: 1,
            background: GRADIENT.goldH,
            opacity: interpolate(
              spring({ frame: frame - 20, fps, config: SPRING_GENTLE }),
              [0, 1],
              [0, 1]
            ),
          }}
        />

        <AmenityGrid amenities={AMENITIES} delay={18} />

        {/* Clubhouse area stat */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 55, fps, config: SPRING_GENTLE }),
              [0, 1],
              [0, 1]
            ),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.serif,
              fontSize: 52,
              fontWeight: FONTS.thin,
              color: "transparent",
              backgroundImage: GRADIENT.goldH,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            20,000
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 12,
              fontWeight: FONTS.semibold,
              letterSpacing: "0.22em",
              color: COLORS.gray,
              textTransform: "uppercase",
            }}
          >
            Sq.Ft. Clubhouse
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.65)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    </AbsoluteFill>
  );
};
