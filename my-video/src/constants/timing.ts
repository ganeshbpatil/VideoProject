export const FPS = 30;

// Scene durations in frames (at 30fps)
export const SCENE_DURATIONS = {
  hook: 5 * FPS,         // 150f  — 5s
  aerial: 5 * FPS,       // 150f  — 5s
  architecture: 5 * FPS, // 150f  — 5s
  lifestyle: 5 * FPS,    // 150f  — 5s
  green: 4 * FPS,        // 120f  — 4s
  clubhouse: 4 * FPS,    // 120f  — 4s
  fitness: 3 * FPS,      //  90f  — 3s
  children: 4 * FPS,     // 120f  — 4s
  community: 4 * FPS,    // 120f  — 4s
  location: 7 * FPS,     // 210f  — 7s
  appreciation: 5 * FPS, // 150f  — 5s
  cta: 9 * FPS,          // 270f  — 9s
};

// Cumulative start frames
export const SCENE_START = (() => {
  const keys = Object.keys(SCENE_DURATIONS) as Array<keyof typeof SCENE_DURATIONS>;
  const starts: Record<string, number> = {};
  let acc = 0;
  for (const k of keys) {
    starts[k] = acc;
    acc += SCENE_DURATIONS[k];
  }
  return starts as Record<keyof typeof SCENE_DURATIONS, number>;
})();

export const TOTAL_FRAMES_60S = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

// 30s — condensed (6 scenes)
export const TOTAL_FRAMES_30S = 30 * FPS;

// 45s — medium (9 scenes)
export const TOTAL_FRAMES_45S = 45 * FPS;

// Transition duration (frames)
export const TRANSITION = 12;

// Standard spring config
export const SPRING_GENTLE = { damping: 14, stiffness: 80, mass: 1 };
export const SPRING_SNAPPY = { damping: 20, stiffness: 200, mass: 0.8 };
export const SPRING_BOUNCE = { damping: 10, stiffness: 100, mass: 1.2 };
