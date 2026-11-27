import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_STACK } from "../fonts";
import { COLORS, EASINGS, RADII, SHADOWS, SPRINGS, TYPOGRAPHY } from "../theme";

export const deterministicUnit = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const SceneFade: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
}> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.outQuad,
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(10, durationInFrames - 10), durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASINGS.inOutCubic,
    }
  );
  const scaleIn = interpolate(frame, [0, 14], [0.985, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.outExpo,
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeIn * fadeOut,
        transform: `scale(${scaleIn})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const MovingBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const orb1X = interpolate(frame, [0, 1440], [18, 74]);
  const orb1Y = 22 + Math.sin(frame / 110) * 10;
  const orb2X = interpolate(frame, [0, 1440], [82, 26]);
  const orb2Y = 76 + Math.cos(frame / 130) * 10;
  const gridOffset = (frame * 0.45) % 80;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at ${orb1X}% ${orb1Y}%, ${COLORS.accentSoft} 0%, transparent 48%), radial-gradient(circle at ${orb2X}% ${orb2Y}%, ${COLORS.secondarySoft} 0%, transparent 46%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -80,
          backgroundImage: `linear-gradient(${COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gridLine} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          transform: `translate(${-gridOffset}px, ${-gridOffset * 0.5}px)`,
        }}
      />

      {Array.from({ length: 8 }).map((_, idx) => {
        const baseX = deterministicUnit(idx + 1) * 1800 + 60;
        const baseY = deterministicUnit(idx + 20) * 960 + 60;
        const size = 6 + deterministicUnit(idx + 50) * 10;
        const floatY = Math.sin(frame / (42 + idx * 7) + idx) * 24;
        const floatX = Math.cos(frame / (54 + idx * 6) + idx) * 18;
        const opacity = 0.18 + 0.16 * Math.sin(frame / 36 + idx);

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: baseX + floatX,
              top: baseY + floatY,
              width: size,
              height: size,
              borderRadius: RADII.pill,
              backgroundColor: idx % 2 === 0 ? COLORS.accent : COLORS.secondary,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const WordReveal: React.FC<{
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  highlightWords?: string[];
  highlightColor?: string;
}> = ({
  text,
  startFrame = 0,
  staggerFrames = 4,
  fontSize = TYPOGRAPHY.title,
  color = COLORS.textPrimary,
  fontWeight = 700,
  align = "left",
  maxWidth = 1600,
  highlightWords = [],
  highlightColor = COLORS.accentBright,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        columnGap: Math.round(fontSize * 0.28),
        rowGap: Math.round(fontSize * 0.12),
        maxWidth,
        fontFamily: FONT_STACK,
        fontSize,
        fontWeight,
        lineHeight: TYPOGRAPHY.lineHeightTight,
      }}
    >
      {words.map((word, idx) => {
        const localFrame = frame - (startFrame + idx * staggerFrames);
        const prog = spring({
          frame: localFrame,
          fps,
          config: SPRINGS.snappy,
        });
        const y = interpolate(prog, [0, 1], [32, 0]);
        const opacity = interpolate(localFrame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isHighlighted = highlightWords.some((hw) => word.includes(hw));

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              display: "inline-block",
              color: isHighlighted ? highlightColor : color,
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const LineMaskReveal: React.FC<{
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
}> = ({ children, startFrame = 0, duration = 16 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASINGS.outExpo,
    }
  );
  const y = interpolate(progress, [0, 1], [44, 0]);

  return (
    <div style={{ overflow: "hidden", paddingTop: 6, paddingBottom: 6 }}>
      <div
        style={{
          opacity: progress,
          transform: `translateY(${y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const HighlightSweep: React.FC<{
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  maxWidth?: number;
}> = ({
  text,
  startFrame = 18,
  fontSize = TYPOGRAPHY.subTitle,
  color = COLORS.textPrimary,
  maxWidth = 1200,
}) => {
  const frame = useCurrentFrame();
  const sweepWidth = interpolate(
    frame,
    [startFrame, startFrame + 24],
    [0, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASINGS.outExpo,
    }
  );

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        maxWidth,
        padding: "8px 20px",
        borderRadius: RADII.inner,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 6,
          bottom: 6,
          width: `${sweepWidth}%`,
          backgroundColor: COLORS.accentSoft,
          borderLeft: sweepWidth > 2 ? `4px solid ${COLORS.accent}` : "none",
          borderRadius: RADII.inner,
        }}
      />
      <div
        style={{
          position: "relative",
          fontFamily: FONT_STACK,
          fontSize,
          fontWeight: 600,
          lineHeight: TYPOGRAPHY.lineHeightRelaxed,
          color,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const GlassCard: React.FC<{
  children: React.ReactNode;
  accent?: boolean;
  style?: React.CSSProperties;
}> = ({ children, accent = false, style }) => {
  return (
    <div
      style={{
        backgroundColor: accent
          ? COLORS.surfaceGlassStrong
          : COLORS.surfaceGlass,
        borderRadius: RADII.card,
        border: `1px solid ${accent ? COLORS.borderAccent : COLORS.borderSubtle}`,
        boxShadow: accent ? SHADOWS.cardAccent : SHADOWS.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const BrandLogoMark: React.FC<{ size?: number; pulse?: number }> = ({
  size = 96,
  pulse = 1,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <circle
        cx="60"
        cy="60"
        r={54}
        stroke={COLORS.accent}
        strokeOpacity={0.35}
        strokeWidth="3"
      />
      <circle cx="60" cy="60" r={44 * pulse} fill={COLORS.accentSoft} />
      <rect x="30" y="48" width="8" height="24" rx="4" fill={COLORS.accentBright} />
      <rect x="44" y="34" width="8" height="52" rx="4" fill={COLORS.accent} />
      <rect x="58" y="24" width="8" height="72" rx="4" fill={COLORS.textPrimary} />
      <rect x="72" y="38" width="8" height="44" rx="4" fill={COLORS.accent} />
      <rect x="86" y="50" width="8" height="20" rx="4" fill={COLORS.secondary} />
    </svg>
  );
};
