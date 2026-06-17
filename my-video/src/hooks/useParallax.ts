import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const useParallax = (strength = 0.08) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;
  const translateY = interpolate(progress, [0, 1], [0, -strength * 100]);
  const scale = interpolate(progress, [0, 1], [1.08, 1.0]);
  return { translateY: `${translateY}%`, scale };
};

export const useSlowZoom = (from = 1.0, to = 1.12) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [from, to]);
  return scale;
};

export const usePan = (direction: "left" | "right" = "left", strength = 3) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [0, direction === "left" ? -strength : strength]);
  return `${x}%`;
};
