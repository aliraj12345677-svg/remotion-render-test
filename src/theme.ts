import { Easing } from "remotion";

export const COLORS = {
  bgDeep: "#050A11",
  bgMid: "#0A1422",
  bgElevated: "#0F1D30",
  surfaceGlass: "rgba(13, 25, 42, 0.80)",
  surfaceGlassStrong: "rgba(16, 31, 52, 0.92)",
  surfaceMuted: "rgba(255, 255, 255, 0.04)",
  borderSubtle: "rgba(148, 179, 209, 0.16)",
  borderAccent: "rgba(31, 207, 184, 0.42)",
  borderWarm: "rgba(249, 115, 98, 0.45)",

  accent: "#1FCFB8",
  accentBright: "#5EEAD4",
  accentSoft: "rgba(31, 207, 184, 0.14)",
  accentGlow: "rgba(31, 207, 184, 0.34)",
  secondary: "#38BDF8",
  secondarySoft: "rgba(56, 189, 248, 0.14)",
  warm: "#F97362",
  warmSoft: "rgba(249, 115, 98, 0.15)",

  textPrimary: "#F8FAFC",
  textSecondary: "#B4C7DC",
  textMuted: "#7E96B0",
  textOnAccent: "#04181A",
  gridLine: "rgba(148, 179, 209, 0.05)",
} as const;

export const RADII = {
  card: 28,
  inner: 18,
  pill: 999,
} as const;

export const SHADOWS = {
  card: "0 24px 64px rgba(2, 6, 14, 0.68), 0 0 0 1px rgba(148, 179, 209, 0.12)",
  cardAccent:
    "0 24px 68px rgba(2, 6, 14, 0.72), 0 0 42px rgba(31, 207, 184, 0.22), 0 0 0 1px rgba(31, 207, 184, 0.36)",
  glowPill: "0 10px 30px rgba(31, 207, 184, 0.25)",
} as const;

export const SPRINGS = {
  smooth: { damping: 18, stiffness: 120, mass: 0.9 },
  snappy: { damping: 15, stiffness: 190, mass: 0.8 },
  gentle: { damping: 24, stiffness: 90, mass: 1 },
} as const;

export const EASINGS = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
  outQuad: Easing.bezier(0.25, 1, 0.5, 1),
} as const;

export const TYPOGRAPHY = {
  heroTitle: 118,
  title: 94,
  subTitle: 64,
  body: 56,
  uiLabel: 56,
  techCode: 30,
  lineHeightTight: 1.38,
  lineHeightRelaxed: 1.44,
} as const;

export const LAYOUT = {
  safePaddingX: 96,
  safePaddingY: 76,
  cardGap: 36,
} as const;
