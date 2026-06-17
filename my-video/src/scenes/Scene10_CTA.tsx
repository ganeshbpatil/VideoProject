import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Img, staticFile } from "remotion";
import { BottomFade, TopFade } from "../components/CinematicBackground";
import { CTASection } from "../components/CTASection";
import { LightSweep, GoldLine } from "../components/LightSweep";
import { COLORS, FONTS, GRADIENT } from "../constants/theme";
import { SPRING_GENTLE } from "../constants/timing";
import { PROJECT } from "../constants/config";

interface Scene10CTAProps {
  cta?: string;
  headline?: string;
}

export const Scene10_CTA: React.FC<Scene10CTAProps> = ({
  cta = "Book Your Private Tour",
  headline = "Your Best Life",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rays = Array.from({ length: 12 });
  const rayRotate = frame * 0.15;

  return (
    <AbsoluteFill>
      {/* Photo — heavily blurred, darkened luxury backdrop */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("skyipark-main.jpg")}
          style={{
            width: "110%",
            height: "110%",
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "blur(8px)",
            transform: "scale(1.05)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(4,4,6,0.88)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 65%)" }} />
      </AbsoluteFill>

      <TopFade />
      <BottomFade />
      <LightSweep delay={5} color="rgba(201,168,76,0.1)" duration={90} />

      {/* Gold rays */}
      <AbsoluteFill style={{ zIndex: 3 }}>
        {rays.map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: "65%", height: 1,
            background: "linear-gradient(90deg, rgba(201,168,76,0.14), transparent)",
            transformOrigin: "left center",
            transform: `rotate(${(i * 360) / rays.length + rayRotate}deg)`,
          }} />
        ))}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)",
        }} />
      </AbsoluteFill>

      {/* Top gold line */}
      <div style={{ position: "absolute", top: "14%", left: "50%", transform: "translateX(-50%)", zIndex: 25 }}>
        <GoldLine delay={0} width="180px" />
      </div>

      {/* Main content */}
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 20, padding: "0 52px", gap: 16,
      }}>
        <div style={{
          opacity: interpolate(spring({ frame: frame - 5, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          fontFamily: FONTS.sans, fontSize: 11, fontWeight: FONTS.semibold,
          letterSpacing: "0.4em", color: COLORS.gold, textTransform: "uppercase",
        }}>{PROJECT.name} · {PROJECT.locationShort}</div>

        <CTASection headline={headline} subline="Starts Here" cta={cta} delay={10} showContact />

        {/* Disclaimer */}
        <div style={{
          position: "absolute", bottom: 36, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: interpolate(spring({ frame: frame - 40, fps, config: SPRING_GENTLE }), [0, 1], [0, 0.45]),
        }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 9,
            color: COLORS.gray, letterSpacing: "0.08em", textAlign: "center",
          }}>*T&C Apply. Price subject to change. | {PROJECT.rera}</div>
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", bottom: "14%", left: "50%", transform: "translateX(-50%)", zIndex: 25 }}>
        <GoldLine delay={30} width="180px" />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 250px rgba(0,0,0,0.75)",
        pointerEvents: "none", zIndex: 15,
      }} />
    </AbsoluteFill>
  );
};
