import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01_Hook } from "../scenes/Scene01_Hook";
import { Scene02_AerialReveal } from "../scenes/Scene02_AerialReveal";
import { Scene03_Architecture } from "../scenes/Scene03_Architecture";
import { Scene05_Green } from "../scenes/Scene05_Green";
import { Scene06_Amenities } from "../scenes/Scene06_Amenities";
import { Scene08_Location } from "../scenes/Scene08_Location";
import { Scene09_Investment } from "../scenes/Scene09_Investment";
import { Scene10_CTA } from "../scenes/Scene10_CTA";
import { FPS } from "../constants/timing";

// 45s condensed — strongest scenes only
const S = {
  hook: 4 * FPS,
  aerial: 4 * FPS,
  arch: 4 * FPS,
  green: 4 * FPS,
  amenities: 5 * FPS,
  location: 6 * FPS,
  investment: 4 * FPS,
  cta: 14 * FPS,
};

export const TOTAL_45S = Object.values(S).reduce((a, b) => a + b, 0);

export const Video45s: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#080808" }}>
      <Series>
        <Series.Sequence durationInFrames={S.hook}>
          <Scene01_Hook hookText={"Would you choose traffic — or trees?"} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.aerial}>
          <Scene02_AerialReveal />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.arch}>
          <Scene03_Architecture />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.green}>
          <Scene05_Green />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.amenities}>
          <Scene06_Amenities />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.location}>
          <Scene08_Location />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.investment}>
          <Scene09_Investment />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.cta}>
          <Scene10_CTA cta="Schedule Your Site Visit" headline="Limited Homes Available" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
