import React from "react";
import { AbsoluteFill, Series, useCurrentFrame, interpolate } from "remotion";
import { Scene01_Hook } from "../scenes/Scene01_Hook";
import { Scene02_AerialReveal } from "../scenes/Scene02_AerialReveal";
import { Scene03_Architecture } from "../scenes/Scene03_Architecture";
import { Scene04_Lifestyle } from "../scenes/Scene04_Lifestyle";
import { Scene05_Green } from "../scenes/Scene05_Green";
import { Scene06_Amenities } from "../scenes/Scene06_Amenities";
import { Scene07_Children } from "../scenes/Scene07_Children";
import { Scene08_Location } from "../scenes/Scene08_Location";
import { Scene09_Investment } from "../scenes/Scene09_Investment";
import { Scene10_CTA } from "../scenes/Scene10_CTA";
import { FPS } from "../constants/timing";

// Scene durations (frames)
const S = {
  hook: 5 * FPS,
  aerial: 5 * FPS,
  arch: 5 * FPS,
  lifestyle: 5 * FPS,
  green: 4 * FPS,
  amenities: 5 * FPS,
  children: 4 * FPS,
  location: 8 * FPS,
  investment: 5 * FPS,
  cta: 14 * FPS,
};

// Total = 60s
export const TOTAL_60S = Object.values(S).reduce((a, b) => a + b, 0);

export const Video60s: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#080808" }}>
      <Series>
        <Series.Sequence durationInFrames={S.hook}>
          <Scene01_Hook hookText={"What if your home felt less like a house\n— and more like a destination?"} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.aerial}>
          <Scene02_AerialReveal />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.arch}>
          <Scene03_Architecture />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.lifestyle}>
          <Scene04_Lifestyle />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.green}>
          <Scene05_Green />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.amenities}>
          <Scene06_Amenities />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.children}>
          <Scene07_Children />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.location}>
          <Scene08_Location />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.investment}>
          <Scene09_Investment />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.cta}>
          <Scene10_CTA cta="Book Your Private Tour" headline="Your Best Life" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
