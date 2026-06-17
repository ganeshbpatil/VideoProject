import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene01_Hook } from "../scenes/Scene01_Hook";
import { Scene02_AerialReveal } from "../scenes/Scene02_AerialReveal";
import { Scene05_Green } from "../scenes/Scene05_Green";
import { Scene06_Amenities } from "../scenes/Scene06_Amenities";
import { Scene08_Location } from "../scenes/Scene08_Location";
import { Scene10_CTA } from "../scenes/Scene10_CTA";
import { FPS } from "../constants/timing";

// 30s — ultra-punchy for Reels / Shorts
const S = {
  hook: 3 * FPS,
  aerial: 4 * FPS,
  green: 3 * FPS,
  amenities: 4 * FPS,
  location: 4 * FPS,
  cta: 12 * FPS,
};

export const TOTAL_30S = Object.values(S).reduce((a, b) => a + b, 0);

export const Video30s: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#080808" }}>
      <Series>
        <Series.Sequence durationInFrames={S.hook}>
          <Scene01_Hook hookText={"Imagine waking up to this.\nEvery. Single. Morning."} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S.aerial}>
          <Scene02_AerialReveal />
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

        <Series.Sequence durationInFrames={S.cta}>
          <Scene10_CTA cta="Walk In. Fall In Love." headline="SKYi Park" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
