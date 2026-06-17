import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { Video60s, TOTAL_60S } from "./compositions/Video60s";
import { Video45s, TOTAL_45S } from "./compositions/Video45s";
import { Video30s, TOTAL_30S } from "./compositions/Video30s";
import { FPS } from "./constants/timing";

// ─── Platform Presets ─────────────────────────────────────────────────────────
const VERTICAL = { width: 1080, height: 1920 };   // Reels / Shorts
const SQUARE = { width: 1080, height: 1350 };      // Facebook Feed
const LANDSCAPE = { width: 1920, height: 1080 };   // YouTube / Website

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── 60s Full Film ─────────────────────────────────────────── */}
      <Composition
        id="SKYiPark_60s_Landscape"
        component={Video60s}
        durationInFrames={TOTAL_60S}
        fps={FPS}
        {...LANDSCAPE}
        defaultProps={{}}
      />
      <Composition
        id="SKYiPark_60s_Vertical"
        component={Video60s}
        durationInFrames={TOTAL_60S}
        fps={FPS}
        {...VERTICAL}
        defaultProps={{}}
      />

      {/* ── 45s YouTube / Facebook Ad ─────────────────────────────── */}
      <Composition
        id="SKYiPark_45s_Landscape"
        component={Video45s}
        durationInFrames={TOTAL_45S}
        fps={FPS}
        {...LANDSCAPE}
        defaultProps={{}}
      />
      <Composition
        id="SKYiPark_45s_Vertical"
        component={Video45s}
        durationInFrames={TOTAL_45S}
        fps={FPS}
        {...VERTICAL}
        defaultProps={{}}
      />

      {/* ── 30s Reels / Shorts ────────────────────────────────────── */}
      <Composition
        id="SKYiPark_30s_Reels"
        component={Video30s}
        durationInFrames={TOTAL_30S}
        fps={FPS}
        {...VERTICAL}
        defaultProps={{}}
      />
      <Composition
        id="SKYiPark_30s_Landscape"
        component={Video30s}
        durationInFrames={TOTAL_30S}
        fps={FPS}
        {...LANDSCAPE}
        defaultProps={{}}
      />
      <Composition
        id="SKYiPark_30s_Square"
        component={Video30s}
        durationInFrames={TOTAL_30S}
        fps={FPS}
        {...SQUARE}
        defaultProps={{}}
      />
    </>
  );
};
