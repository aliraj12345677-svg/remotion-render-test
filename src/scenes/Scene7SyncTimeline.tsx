import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_STACK } from "../fonts";
import { COLORS, EASINGS, RADII, SPRINGS, TYPOGRAPHY } from "../theme";
import {
  GlassCard,
  SceneFade,
  WordReveal,
  deterministicUnit,
} from "./shared";

export const Scene7SyncTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const trackEnter = spring({
    frame: frame - 10,
    fps,
    config: SPRINGS.smooth,
  });

  const dubSnapOffset = interpolate(frame, [26, 62], [180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.outExpo,
  });

  const playheadPct = interpolate(frame, [20, 140], [6, 94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const syncBadge = spring({
    frame: frame - 64,
    fps,
    config: SPRINGS.snappy,
  });

  return (
    <SceneFade durationInFrames={150}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <WordReveal
              text="স্বাভাবিক গতিতে নিখুঁত সিঙ্ক"
              startFrame={4}
              staggerFrames={5}
              fontSize={TYPOGRAPHY.title}
              maxWidth={1300}
              highlightWords={["নিখুঁত", "সিঙ্ক"]}
            />
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.body,
                fontWeight: 500,
                lineHeight: TYPOGRAPHY.lineHeightRelaxed,
                color: COLORS.textSecondary,
              }}
            >
              মূল ভিডিওর সময়ের সাথে কণ্ঠ মিলে যায়
            </div>
          </div>

          <div
            style={{
              padding: "16px 34px",
              borderRadius: RADII.pill,
              backgroundColor: COLORS.accent,
              fontFamily: FONT_STACK,
              fontSize: TYPOGRAPHY.uiLabel,
              fontWeight: 800,
              lineHeight: TYPOGRAPHY.lineHeightTight,
              color: COLORS.textOnAccent,
              transform: `scale(${syncBadge})`,
              opacity: syncBadge,
            }}
          >
            ১০০% সিঙ্ক
          </div>
        </div>

        <GlassCard
          accent
          style={{
            position: "relative",
            width: "100%",
            padding: "44px 42px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            opacity: trackEnter,
            transform: `translateY(${interpolate(trackEnter, [0, 1], [44, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 320,
              paddingRight: 20,
            }}
          >
            {["00:00", "00:10", "00:20", "00:30", "00:40"].map((tc) => (
              <div
                key={tc}
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.techCode,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                }}
              >
                {tc}
              </div>
            ))}
          </div>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                position: "absolute",
                top: -20,
                bottom: -20,
                left: `calc(320px + (100% - 320px) * ${playheadPct / 100})`,
                width: 4,
                backgroundColor: COLORS.textPrimary,
                zIndex: 5,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: -9,
                  width: 22,
                  height: 22,
                  borderRadius: RADII.pill,
                  backgroundColor: COLORS.accentBright,
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div
                style={{
                  width: 290,
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.uiLabel,
                  fontWeight: 700,
                  lineHeight: TYPOGRAPHY.lineHeightTight,
                  color: COLORS.textSecondary,
                }}
              >
                মূল ভিডিও
              </div>
              <div
                style={{
                  flex: 1,
                  height: 120,
                  borderRadius: RADII.inner,
                  backgroundColor: COLORS.secondarySoft,
                  border: `1.5px solid ${COLORS.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "0 20px",
                }}
              >
                {Array.from({ length: 34 }).map((_, i) => {
                  const h = 22 + deterministicUnit(i + 10) * 64;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: h,
                        borderRadius: RADII.pill,
                        backgroundColor: COLORS.secondary,
                        opacity: 0.72,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div
                style={{
                  width: 290,
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.uiLabel,
                  fontWeight: 700,
                  lineHeight: TYPOGRAPHY.lineHeightTight,
                  color: COLORS.accentBright,
                }}
              >
                বাংলা কণ্ঠ
              </div>
              <div
                style={{
                  flex: 1,
                  height: 120,
                  borderRadius: RADII.inner,
                  backgroundColor: COLORS.accentSoft,
                  border: `2px solid ${COLORS.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "0 20px",
                  transform: `translateX(${dubSnapOffset}px)`,
                }}
              >
                {Array.from({ length: 34 }).map((_, i) => {
                  const h =
                    22 +
                    deterministicUnit(i + 10) * 64 +
                    Math.sin(frame / 6 + i * 0.5) * 6;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 10,
                        height: Math.max(16, h),
                        borderRadius: RADII.pill,
                        backgroundColor: COLORS.accentBright,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </GlassCard>
      </AbsoluteFill>
    </SceneFade>
  );
};
