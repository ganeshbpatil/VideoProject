import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS, FONTS, GRADIENT, SHADOW } from "../constants/theme";
import { SPRING_GENTLE, SPRING_SNAPPY } from "../constants/timing";
import { PROJECT } from "../constants/config";

interface CTASectionProps {
  headline: string;
  subline?: string;
  cta: string;
  delay?: number;
  showContact?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
  headline,
  subline,
  cta,
  delay = 0,
  showContact = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ frame: frame - delay, fps, config: SPRING_GENTLE });
  const s2 = spring({ frame: frame - delay - 10, fps, config: SPRING_SNAPPY });
  const s3 = spring({ frame: frame - delay - 18, fps, config: SPRING_GENTLE });
  const s4 = spring({ frame: frame - delay - 26, fps, config: SPRING_GENTLE });

  const pulse = Math.sin((frame - delay) * 0.06) * 0.015 + 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* Headline */}
      <div
        style={{
          opacity: interpolate(s1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(s1, [0, 1], [30, 0])}px)`,
          fontFamily: FONTS.serif,
          fontSize: 72,
          fontWeight: FONTS.light,
          letterSpacing: "0.02em",
          lineHeight: 1.1,
          color: COLORS.white,
          textAlign: "center",
          textShadow: SHADOW.text,
        }}
      >
        {headline}
      </div>

      {/* Subline */}
      {subline && (
        <div
          style={{
            opacity: interpolate(s2, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(s2, [0, 1], [20, 0])}px)`,
            fontFamily: FONTS.sans,
            fontSize: 18,
            fontWeight: FONTS.light,
            letterSpacing: "0.15em",
            color: COLORS.gray,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {subline}
        </div>
      )}

      {/* Gold divider */}
      <div
        style={{
          opacity: interpolate(s2, [0, 1], [0, 1]),
          width: interpolate(s2, [0, 1], [0, 120]),
          height: 1,
          background: GRADIENT.goldH,
        }}
      />

      {/* CTA Button */}
      <div
        style={{
          opacity: interpolate(s3, [0, 1], [0, 1]),
          transform: `scale(${interpolate(s3, [0, 1], [0.9, 1]) * pulse})`,
          background: GRADIENT.goldV,
          borderRadius: 4,
          padding: "20px 52px",
          fontFamily: FONTS.sans,
          fontSize: 15,
          fontWeight: FONTS.semibold,
          letterSpacing: "0.2em",
          color: COLORS.black,
          textTransform: "uppercase",
          boxShadow: SHADOW.gold,
          cursor: "pointer",
        }}
      >
        {cta}
      </div>

      {/* Contact info */}
      {showContact && (
        <div
          style={{
            opacity: interpolate(s4, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(s4, [0, 1], [10, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 22,
              fontWeight: FONTS.medium,
              letterSpacing: "0.08em",
              color: COLORS.white,
            }}
          >
            {PROJECT.phone}
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: FONTS.light,
              letterSpacing: "0.15em",
              color: COLORS.gray,
              textTransform: "uppercase",
            }}
          >
            {PROJECT.website}
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 11,
              fontWeight: FONTS.light,
              color: COLORS.goldDim,
              marginTop: 4,
            }}
          >
            {PROJECT.rera}
          </div>
        </div>
      )}
    </div>
  );
};
