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
  HighlightSweep,
  SceneFade,
  WordReveal,
} from "./shared";

export const Scene3Upload: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mockupEnter = spring({
    frame: frame - 4,
    fps,
    config: SPRINGS.smooth,
  });
  const fileDrop = spring({
    frame: frame - 26,
    fps,
    config: SPRINGS.snappy,
  });
  const scanY = interpolate(frame, [46, 86], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.inOutCubic,
  });
  const detectedBadge = spring({
    frame: frame - 82,
    fps,
    config: SPRINGS.snappy,
  });

  return (
    <SceneFade durationInFrames={150}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
        }}
      >
        <GlassCard
          accent
          style={{
            width: 900,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            opacity: mockupEnter,
            transform: `translateX(${interpolate(mockupEnter, [0, 1], [-60, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {[COLORS.warm, COLORS.secondary, COLORS.accent].map((dot, i) => (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: RADII.pill,
                    backgroundColor: dot,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.techCode,
                fontWeight: 600,
                color: COLORS.textMuted,
              }}
            >
              STUDIO / UPLOAD
            </div>
          </div>

          <div
            style={{
              position: "relative",
              height: 360,
              borderRadius: RADII.inner,
              border: `2px dashed ${COLORS.borderAccent}`,
              backgroundColor: COLORS.surfaceMuted,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 36px",
                borderRadius: RADII.inner,
                backgroundColor: COLORS.bgElevated,
                border: `1.5px solid ${COLORS.borderAccent}`,
                transform: `translateY(${interpolate(fileDrop, [0, 1], [-80, 0])}px) scale(${fileDrop})`,
                opacity: fileDrop,
              }}
            >
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                <rect
                  x="8"
                  y="14"
                  width="48"
                  height="36"
                  rx="8"
                  stroke={COLORS.accentBright}
                  strokeWidth="4"
                />
                <polygon points="26,24 42,32 26,40" fill={COLORS.accent} />
              </svg>
              <div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.techCode,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                  }}
                >
                  my_story_video.mp4
                </div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.body,
                    fontWeight: 600,
                    lineHeight: TYPOGRAPHY.lineHeightTight,
                    color: COLORS.accentBright,
                  }}
                >
                  আপলোড সম্পন্ন
                </div>
              </div>
            </div>

            {frame >= 46 && frame <= 88 ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${scanY}%`,
                  height: 4,
                  backgroundColor: COLORS.accentBright,
                  boxShadow: `0 0 24px ${COLORS.accent}`,
                }}
              />
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 30px",
              borderRadius: RADII.inner,
              backgroundColor: COLORS.accentSoft,
              border: `1.5px solid ${COLORS.borderAccent}`,
              opacity: detectedBadge,
              transform: `scale(${interpolate(detectedBadge, [0, 1], [0.92, 1])})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.uiLabel,
                fontWeight: 700,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textPrimary,
              }}
            >
              শনাক্ত: ইংরেজি
            </div>
            <div
              style={{
                padding: "10px 24px",
                borderRadius: RADII.pill,
                backgroundColor: COLORS.accent,
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.techCode,
                fontWeight: 800,
                color: COLORS.textOnAccent,
              }}
            >
              AUTO-DETECT
            </div>
          </div>
        </GlassCard>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              padding: "10px 26px",
              borderRadius: RADII.pill,
              backgroundColor: COLORS.accentSoft,
              border: `1px solid ${COLORS.borderAccent}`,
              fontFamily: FONT_STACK,
              fontSize: TYPOGRAPHY.techCode,
              fontWeight: 700,
              color: COLORS.accentBright,
            }}
          >
            STEP 01
          </div>

          <WordReveal
            text="ভিডিও আপলোড করুন"
            startFrame={10}
            staggerFrames={5}
            fontSize={TYPOGRAPHY.title}
            maxWidth={740}
            highlightWords={["আপলোড"]}
          />

          <HighlightSweep
            text="মূল ভাষা নিজে থেকেই চিনে নেবে"
            startFrame={42}
            fontSize={TYPOGRAPHY.subTitle}
            maxWidth={740}
          />
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
