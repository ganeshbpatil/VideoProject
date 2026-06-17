import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { CinematicBackground, BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";

export const Scene09_Investment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Animated graph bar heights
  const bars = [35, 48, 55, 62, 72, 82, 96];
  const barReveal = spring({ frame: frame - 20, fps, config: SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <CinematicBackground variant="appreciation" zoom />
      <TopFade />
      <BottomFade />
      <LightSweep delay={0} color="rgba(201,168,76,0.12)" duration={70} />

      {/* Abstract upward arrows / graph */}
      <AbsoluteFill style={{ zIndex: 4 }}>
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            height: 200,
          }}
        >
          {bars.map((h, i) => {
            const barAnim = spring({ frame: frame - 15 - i * 4, fps, config: SPRING_GENTLE });
            return (
              <div
                key={i}
                style={{
                  width: 32,
                  height: h * interpolate(barAnim, [0, 1], [0, 1]),
                  background: i === bars.length - 1
                    ? GRADIENT.goldV
                    : `rgba(201,168,76,${0.2 + i * 0.08})`,
                  borderRadius: "4px 4px 0 0",
                  position: "relative",
                }}
              >
                {i === bars.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontFamily: FONTS.sans,
                      fontSize: 10,
                      fontWeight: FONTS.semibold,
                      color: COLORS.gold,
                      whiteSpace: "nowrap",
                    }}
                  >
                    +18%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Year labels */}
        <div
          style={{
            position: "absolute",
            bottom: "13%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 12,
            opacity: interpolate(barReveal, [0, 1], [0, 1]),
          }}
        >
          {["2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((yr) => (
            <div
              key={yr}
              style={{
                width: 32,
                textAlign: "center",
                fontFamily: FONTS.sans,
                fontSize: 9,
                color: COLORS.gray,
                letterSpacing: "0.05em",
              }}
            >
              {yr}
            </div>
          ))}
        </div>
      </AbsoluteFill>

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
          marginTop: -100,
        }}
      >
        {/* ROI badge */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame: frame - 5, fps, config: SPRING_GENTLE }),
              [0, 1], [0, 1]
            ),
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.4)",
            borderRadius: 4,
            padding: "8px 24px",
            fontFamily: FONTS.sans,
            fontSize: 11,
            fontWeight: FONTS.semibold,
            letterSpacing: "0.25em",
            color: COLORS.gold,
            textTransform: "uppercase",
          }}
        >
          Smart Investment
        </div>

        <KineticHeadline
          words={["Not", "Just", "A", "Home.", "Your", "Smartest", "Move."]}
          delay={10}
          highlight={[5, 6]}
          fontSize={62}
        />

        <AnimatedCaption
          text="18% year-on-year price growth in the Hinjewadi corridor. Invest before prices rise further."
          delay={28}
          highlight={["18%", "growth", "Invest"]}
          size="md"
        />

        {/* Investment highlights */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 16,
          }}
        >
          {[
            { val: "18%", label: "Annual Appreciation" },
            { val: "₹1.2Cr", label: "Starting Price" },
            { val: "IGBC", label: "Green Certified" },
          ].map((stat, i) => {
            const s = spring({ frame: frame - 35 - i * 8, fps, config: SPRING_GENTLE });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
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
