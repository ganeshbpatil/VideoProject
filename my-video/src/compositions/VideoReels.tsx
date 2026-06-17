import React from "react";
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { Scene01_Hook } from "../scenes/Scene01_Hook";
import { Scene05_Green } from "../scenes/Scene05_Green";
import { Scene06_Amenities } from "../scenes/Scene06_Amenities";
import { Scene07_Children } from "../scenes/Scene07_Children";
import { Scene10_CTA } from "../scenes/Scene10_CTA";
import { BottomFade, TopFade } from "../components/CinematicBackground";
import { KineticHeadline } from "../components/KineticHeadline";
import { AnimatedCaption } from "../components/AnimatedCaption";
import { LightSweep, ViralMomentBadge, GoldLine } from "../components/LightSweep";
import { GlassMorphCard } from "../components/GlassMorphCard";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE, SPRING_SNAPPY, FPS } from "../constants/timing";
import { PROJECT } from "../constants/config";

// ─── Shared photo background ──────────────────────────────────────────────────
const Photo: React.FC<{
  scaleTo?: number;
  panX?: number;
  panY?: number;
  pos?: string;
  dark?: number;
}> = ({ scaleTo = 1.0, panX = 0, panY = 0, pos = "center 40%", dark = 0.6 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;
  const scale = interpolate(p, [0, 1], [1.1, scaleTo]);
  const tx = interpolate(p, [0, 1], [0, panX]);
  const ty = interpolate(p, [0, 1], [0, panY]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile("skyipark-main.jpg")}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: pos,
          transform: `scale(${scale}) translate(${tx}%,${ty}%)`,
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: `rgba(5,6,10,${dark})` }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,6,10,0.7) 0%, transparent 40%, rgba(5,6,10,0.92) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 35%, rgba(201,168,76,0.07) 0%, transparent 60%)" }} />
    </AbsoluteFill>
  );
};

// ─── Scene: Photo Reveal (Towers full bleed) ─────────────────────────────────
const PhotoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Photo scaleTo={1.0} panX={-2} pos="center 38%" dark={0.52} />
      <TopFade /><BottomFade />
      <LightSweep delay={0} color="rgba(201,168,76,0.1)" duration={55} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        padding: "0 52px 120px", gap: 20, zIndex: 20,
      }}>
        <ViralMomentBadge text="SKYi Park · Pune" delay={5} />
        <KineticHeadline
          words={["3", "Iconic", "Towers.", "One", "Destination."]}
          delay={12} highlight={[0, 2, 4]} fontSize={58}
        />
        <AnimatedCaption
          text="15 acres · Mahalunge · Pune"
          delay={28} highlight={["15", "acres"]} size="md"
        />
        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 8,
          opacity: interpolate(spring({ frame: frame - 32, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]) }}>
          {[
            { v: PROJECT.acres, l: "Acres" },
            { v: PROJECT.towers, l: "Towers" },
            { v: PROJECT.floors, l: "Floors" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 40, fontWeight: FONTS.thin,
                color: "transparent", backgroundImage: GRADIENT.goldH,
                backgroundClip: "text", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{s.v}</div>
              <div style={{
                fontFamily: FONTS.sans, fontSize: 9, fontWeight: FONTS.semibold,
                letterSpacing: "0.2em", color: COLORS.gray, textTransform: "uppercase",
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(0,0,0,0.6)", pointerEvents: "none", zIndex: 15 }} />
    </AbsoluteFill>
  );
};

// ─── Scene: Location USP ─────────────────────────────────────────────────────
const LocationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Photo scaleTo={1.02} panX={2} pos="center 50%" dark={0.68} />
      <TopFade /><BottomFade />
      <LightSweep delay={5} color="rgba(40,80,160,0.1)" angle={30} duration={55} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 52px", gap: 28, zIndex: 20,
      }}>
        <div style={{
          opacity: interpolate(spring({ frame: frame - 5, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.4)",
          borderRadius: 4, padding: "8px 22px",
          fontFamily: FONTS.sans, fontSize: 10, fontWeight: FONTS.semibold,
          letterSpacing: "0.28em", color: COLORS.gold, textTransform: "uppercase",
        }}>Prime Location</div>

        <KineticHeadline
          words={["15", "Minutes", "From", "Hinjewadi", "IT", "Hub"]}
          delay={10} highlight={[0, 3, 4, 5]} fontSize={52}
        />
        <AnimatedCaption
          text="Connected to the city. Insulated from its chaos."
          delay={26} highlight={["Connected", "Insulated"]} size="md"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8, width: "100%" }}>
          {[
            { icon: "💼", label: "Hinjewadi IT Hub", dist: "15 min" },
            { icon: "🛣️", label: "Mumbai Expressway", dist: "8 min" },
            { icon: "🏫", label: "Top Schools", dist: "5 min" },
            { icon: "✈️", label: "Pune Airport", dist: "30 min" },
          ].map((pt, i) => {
            const s = spring({ frame: frame - 30 - i * 6, fps, config: SPRING_GENTLE });
            return (
              <div key={i} style={{
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(s, [0, 1], [-18, 0])}px)`,
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 10, padding: "10px 16px",
              }}>
                <span style={{ fontSize: 20 }}>{pt.icon}</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.grayLight, flex: 1 }}>{pt.label}</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: FONTS.semibold, color: COLORS.gold }}>{pt.dist}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(0,0,0,0.6)", pointerEvents: "none", zIndex: 15 }} />
    </AbsoluteFill>
  );
};

// ─── Scene: Investment / Price ────────────────────────────────────────────────
const PriceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const exitOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame * 0.07) * 0.018;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <Photo scaleTo={1.04} panX={-1} pos="center 42%" dark={0.72} />
      <TopFade /><BottomFade />
      <LightSweep delay={0} color="rgba(201,168,76,0.12)" duration={60} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 52px", gap: 28, zIndex: 20,
      }}>
        <KineticHeadline
          words={["Not", "Just", "A", "Home.", "Your", "Smartest", "Move."]}
          delay={8} highlight={[4, 5, 6]} fontSize={50}
        />

        {/* Big price */}
        <div style={{
          opacity: interpolate(spring({ frame: frame - 22, fps, config: SPRING_GENTLE }), [0, 1], [0, 1]),
          transform: `scale(${interpolate(spring({ frame: frame - 22, fps, config: SPRING_GENTLE }), [0, 1], [0.85, 1]) * pulse})`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.35)",
          borderRadius: 16, padding: "24px 48px",
        }}>
          <div style={{
            fontFamily: FONTS.serif, fontSize: 64, fontWeight: FONTS.thin,
            color: "transparent", backgroundImage: GRADIENT.goldH,
            backgroundClip: "text", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", lineHeight: 1,
          }}>{PROJECT.priceShort}</div>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 11, fontWeight: FONTS.semibold,
            letterSpacing: "0.22em", color: COLORS.gray, textTransform: "uppercase",
          }}>Starting Price</div>
        </div>

        {/* ROI + Green cert */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { val: "18%", label: "Annual Growth" },
            { val: "IGBC", label: "Green Certified" },
          ].map((s, i) => {
            const anim = spring({ frame: frame - 32 - i * 8, fps, config: SPRING_GENTLE });
            return (
              <div key={i} style={{
                opacity: interpolate(anim, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(anim, [0, 1], [15, 0])}px)`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 12, padding: "14px 24px",
              }}>
                <div style={{
                  fontFamily: FONTS.serif, fontSize: 36, fontWeight: FONTS.thin,
                  color: "transparent", backgroundImage: GRADIENT.goldH,
                  backgroundClip: "text", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>{s.val}</div>
                <div style={{
                  fontFamily: FONTS.sans, fontSize: 9, fontWeight: FONTS.semibold,
                  letterSpacing: "0.18em", color: COLORS.gray, textTransform: "uppercase",
                }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        <AnimatedCaption
          text="Hinjewadi corridor — Pune's fastest appreciating address."
          delay={40} highlight={["Hinjewadi", "fastest", "appreciating"]} size="sm"
        />
      </AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(0,0,0,0.65)", pointerEvents: "none", zIndex: 15 }} />
    </AbsoluteFill>
  );
};

// ─── Scene durations for 30s Reels ───────────────────────────────────────────
const S = {
  hook: 3 * FPS,          //  3s
  reveal: 4 * FPS,        //  4s
  green: 3 * FPS,         //  3s
  amenities: 3 * FPS,     //  3s
  location: 5 * FPS,      //  5s
  price: 3 * FPS,         //  3s
  cta: 9 * FPS,           //  9s
};                        // = 30s total

export const TOTAL_REELS = Object.values(S).reduce((a, b) => a + b, 0);

export const VideoReels: React.FC = () => (
  <AbsoluteFill style={{ background: "#060608" }}>
    <Series>
      <Series.Sequence durationInFrames={S.hook}>
        <Scene01_Hook hookText={"Imagine waking up\nto this.\nEvery. Single. Day."} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.reveal}>
        <PhotoReveal />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.green}>
        <Scene05_Green />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.amenities}>
        <Scene06_Amenities />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.location}>
        <LocationScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.price}>
        <PriceScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={S.cta}>
        <Scene10_CTA cta="Walk In. Fall In Love." headline="SKYi Park" />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
