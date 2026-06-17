import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Video60s, TOTAL_60S } from "./compositions/Video60s";
import { Video45s, TOTAL_45S } from "./compositions/Video45s";
import { Video30s, TOTAL_30S } from "./compositions/Video30s";
import { FPS } from "./constants/timing";

const VERTICAL  = { width: 1080, height: 1920 };
const SQUARE    = { width: 1080, height: 1350 };
const LANDSCAPE = { width: 1920, height: 1080 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 60s Full Film */}
      <Composition id="SKYiPark-60s-Landscape" component={Video60s} durationInFrames={TOTAL_60S} fps={FPS} {...LANDSCAPE} defaultProps={{}} />
      <Composition id="SKYiPark-60s-Vertical"  component={Video60s} durationInFrames={TOTAL_60S} fps={FPS} {...VERTICAL}  defaultProps={{}} />

      {/* 45s YouTube / Facebook Ad */}
      <Composition id="SKYiPark-45s-Landscape" component={Video45s} durationInFrames={TOTAL_45S} fps={FPS} {...LANDSCAPE} defaultProps={{}} />
      <Composition id="SKYiPark-45s-Vertical"  component={Video45s} durationInFrames={TOTAL_45S} fps={FPS} {...VERTICAL}  defaultProps={{}} />

      {/* 30s Reels / Shorts */}
      <Composition id="SKYiPark-30s-Reels"     component={Video30s} durationInFrames={TOTAL_30S} fps={FPS} {...VERTICAL}  defaultProps={{}} />
      <Composition id="SKYiPark-30s-Landscape" component={Video30s} durationInFrames={TOTAL_30S} fps={FPS} {...LANDSCAPE} defaultProps={{}} />
      <Composition id="SKYiPark-30s-Square"    component={Video30s} durationInFrames={TOTAL_30S} fps={FPS} {...SQUARE}    defaultProps={{}} />
    </>
  );
};
