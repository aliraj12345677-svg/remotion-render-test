import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_STACK } from "../fonts";
import { COLORS, RADII, SPRINGS, TYPOGRAPHY } from "../theme";
import {
  GlassCard,
  LineMaskReveal,
  SceneFade,
  WordReveal,
} from "./shared";

export const Scene6ZeroCredit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const keySlide = spring({
    frame: frame - 14,
    fps,
    config: SPRINGS.snappy,
  });
  const coreScale = spring({
    frame: frame - 36,
    fps,
    config: SPRINGS.smooth,
  });
  const cableProgress = interpolate(frame, [24, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseRing = 1 + Math.sin(frame / 10) * 0.06;

  return (
    <SceneFade durationInFrames={150}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <WordReveal
          text="নিজস্ব জেমিনি কী — ০ ক্রেডিট"
          startFrame={4}
          staggerFrames={5}
          fontSize={TYPOGRAPHY.title}
          align="center"
          maxWidth={1600}
          highlightWords={["জেমিনি", "০", "ক্রেডিট"]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 0,
          }}
        >
          <GlassCard
            style={{
              width: 580,
              padding: "38px 42px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transform: `translateX(${interpolate(keySlide, [0, 1], [-80, 0])}px)`,
              opacity: keySlide,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: RADII.inner,
                  backgroundColor: COLORS.accentSoft,
                  border: `1.5px solid ${COLORS.borderAccent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="17"
                    cy="24"
                    r="9"
                    stroke={COLORS.accentBright}
                    strokeWidth="4"
                  />
                  <path
                    d="M26 24H42M36 24V31M42 24V29"
                    stroke={COLORS.accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.techCode,
                  fontWeight: 700,
                  color: COLORS.accentBright,
                }}
              >
                GEMINI API KEY
              </div>
            </div>

            <div
              style={{
                padding: "18px 24px",
                borderRadius: RADII.inner,
                backgroundColor: COLORS.bgDeep,
                border: `1px solid ${COLORS.borderSubtle}`,
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.techCode,
                fontWeight: 700,
                letterSpacing: 3,
                color: COLORS.textPrimary,
              }}
            >
              AIzaSy••••••••••••8X9
            </div>

            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.body,
                fontWeight: 600,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textSecondary,
              }}
            >
              সংযুক্ত হয়েছে
            </div>
          </GlassCard>

          <div
            style={{
              width: 220,
              height: 8,
              backgroundColor: COLORS.surfaceMuted,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${cableProgress * 100}%`,
                backgroundColor: COLORS.accentBright,
                boxShadow: `0 0 22px ${COLORS.accent}`,
              }}
            />
          </div>

          <GlassCard
            accent
            style={{
              width: 600,
              padding: "46px 48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
              transform: `scale(${coreScale * pulseRing})`,
              opacity: coreScale,
            }}
          >
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.heroTitle,
                fontWeight: 800,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.accentBright,
              }}
            >
              ০ ক্রেডিট
            </div>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.body,
                fontWeight: 600,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textPrimary,
                textAlign: "center",
              }}
            >
              কোনো বাড়তি খরচ নেই
            </div>
          </GlassCard>
        </div>

        <LineMaskReveal startFrame={54} duration={18}>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: TYPOGRAPHY.subTitle,
              fontWeight: 500,
              lineHeight: TYPOGRAPHY.lineHeightRelaxed,
              color: COLORS.textSecondary,
              textAlign: "center",
            }}
          >
            আপনার নিজের কী দিয়েই সীমাহীন ব্যবহার
          </div>
        </LineMaskReveal>
      </AbsoluteFill>
    </SceneFade>
  );
};
