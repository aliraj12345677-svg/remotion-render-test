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
  LineMaskReveal,
  SceneFade,
  WordReveal,
  deterministicUnit,
} from "./shared";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPhaseTwo = frame >= 122;
  const phase1Opacity = interpolate(frame, [110, 124], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Progress = spring({
    frame: frame - 122,
    fps,
    config: SPRINGS.smooth,
  });

  const lockScale = spring({
    frame: frame - 6,
    fps,
    config: SPRINGS.snappy,
  });

  const stepLineProgress = interpolate(frame, [156, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneFade durationInFrames={248}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "76px 96px",
        }}
      >
        {!isPhaseTwo || phase1Opacity > 0.01 ? (
          <AbsoluteFill
            style={{
              opacity: phase1Opacity,
              justifyContent: "center",
              alignItems: "center",
              padding: "76px 110px",
              gap: 44,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 36,
                transform: `scale(${lockScale})`,
              }}
            >
              <div
                style={{
                  width: 112,
                  height: 112,
                  borderRadius: RADII.card,
                  backgroundColor: COLORS.warmSoft,
                  border: `2px solid ${COLORS.borderWarm}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                  <rect
                    x="14"
                    y="28"
                    width="36"
                    height="26"
                    rx="7"
                    stroke={COLORS.warm}
                    strokeWidth="4.5"
                  />
                  <path
                    d="M22 28V20C22 14.477 26.477 10 32 10C37.523 10 42 14.477 42 20V28"
                    stroke={COLORS.warm}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="12"
                    x2="52"
                    y2="52"
                    stroke={COLORS.textPrimary}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {Array.from({ length: 18 }).map((_, i) => {
                  const baseH = 22 + deterministicUnit(i + 3) * 56;
                  const jitter = Math.sin(frame / 4 + i * 1.3) * 6;
                  const broken = i >= 8 && i <= 10;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: broken ? 8 : Math.max(14, baseH + jitter),
                        borderRadius: RADII.pill,
                        backgroundColor: broken ? COLORS.warm : COLORS.textMuted,
                        opacity: broken ? 0.9 : 0.45,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <WordReveal
              text="ভাষার বাধায় মানুষ বুঝছে না?"
              startFrame={10}
              staggerFrames={5}
              fontSize={TYPOGRAPHY.heroTitle}
              align="center"
              maxWidth={1550}
              highlightWords={["ভাষার", "বাধায়"]}
              highlightColor={COLORS.warm}
            />

            <LineMaskReveal startFrame={42} duration={18}>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.subTitle,
                  fontWeight: 500,
                  lineHeight: TYPOGRAPHY.lineHeightRelaxed,
                  color: COLORS.textSecondary,
                  textAlign: "center",
                  maxWidth: 1400,
                }}
              >
                ভালো ভিডিও থেকেও দর্শক দূরে সরে যায়
              </div>
            </LineMaskReveal>
          </AbsoluteFill>
        ) : null}

        {isPhaseTwo ? (
          <AbsoluteFill
            style={{
              opacity: phase2Progress,
              justifyContent: "center",
              alignItems: "center",
              padding: "76px 100px",
              gap: 48,
            }}
          >
            <WordReveal
              text="নিজের ভাষায় ডাব করুন"
              startFrame={124}
              staggerFrames={5}
              fontSize={TYPOGRAPHY.heroTitle}
              align="center"
              maxWidth={1550}
              highlightWords={["নিজের", "ভাষায়"]}
              highlightColor={COLORS.accentBright}
            />

            <LineMaskReveal startFrame={148} duration={18}>
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
                যেকোনো ভিডিও, মাত্র কয়েক ধাপেই
              </div>
            </LineMaskReveal>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 1120,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  right: 70,
                  top: "50%",
                  height: 6,
                  backgroundColor: COLORS.surfaceMuted,
                  borderRadius: RADII.pill,
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${stepLineProgress * 100}%`,
                    backgroundColor: COLORS.accent,
                    borderRadius: RADII.pill,
                  }}
                />
              </div>

              {["১. আপলোড", "২. ভাষা", "৩. ডাবিং"].map((label, idx) => {
                const nodeProg = spring({
                  frame: frame - (146 + idx * 14),
                  fps,
                  config: SPRINGS.snappy,
                });
                return (
                  <div
                    key={label}
                    style={{
                      position: "relative",
                      padding: "16px 38px",
                      borderRadius: RADII.pill,
                      backgroundColor: COLORS.bgElevated,
                      border: `2px solid ${COLORS.accent}`,
                      transform: `scale(${nodeProg})`,
                      fontFamily: FONT_STACK,
                      fontSize: TYPOGRAPHY.body,
                      fontWeight: 700,
                      lineHeight: TYPOGRAPHY.lineHeightTight,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </AbsoluteFill>
        ) : null}
      </AbsoluteFill>
    </SceneFade>
  );
};
