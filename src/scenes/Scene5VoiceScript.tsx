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
import { GlassCard, SceneFade, WordReveal } from "./shared";

const VOICES = [
  { name: "কণ্ঠ ০১ (গম্ভীর)", active: true },
  { name: "কণ্ঠ ০২ (কোমল)", active: false },
] as const;

export const Scene5VoiceScript: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEnter = spring({
    frame: frame - 10,
    fps,
    config: SPRINGS.smooth,
  });
  const rightEnter = spring({
    frame: frame - 18,
    fps,
    config: SPRINGS.smooth,
  });

  const editHighlight = interpolate(frame, [52, 92], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOpacity = Math.floor(frame / 12) % 2 === 0 ? 1 : 0;

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
            alignItems: "center",
          }}
        >
          <WordReveal
            text="কণ্ঠশিল্পী ও অনুবাদ সম্পাদনা"
            startFrame={4}
            staggerFrames={5}
            fontSize={TYPOGRAPHY.title}
            maxWidth={1450}
            highlightWords={["কণ্ঠশিল্পী", "অনুবাদ"]}
          />
          <div
            style={{
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
            STEP 03
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, flex: 1, marginTop: 40 }}>
          <GlassCard
            accent
            style={{
              flex: 1,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: leftEnter,
              transform: `translateY(${interpolate(leftEnter, [0, 1], [48, 0])}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.subTitle,
                fontWeight: 700,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.accentBright,
              }}
            >
              পছন্দের কণ্ঠ
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {VOICES.map((voice, idx) => (
                <div
                  key={voice.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "26px 30px",
                    borderRadius: RADII.inner,
                    backgroundColor: voice.active
                      ? COLORS.accentSoft
                      : COLORS.surfaceMuted,
                    border: `2px solid ${
                      voice.active ? COLORS.accent : COLORS.borderSubtle
                    }`,
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
                    {voice.name}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", height: 42 }}>
                    {Array.from({ length: 7 }).map((_, b) => {
                      const h = voice.active
                        ? 14 + Math.abs(Math.sin(frame / 5 + b * 0.9)) * 28
                        : 14 + (b % 3) * 6;
                      return (
                        <div
                          key={b}
                          style={{
                            width: 7,
                            height: h,
                            borderRadius: RADII.pill,
                            backgroundColor: voice.active
                              ? COLORS.accentBright
                              : COLORS.textMuted,
                            opacity: idx === 0 ? 1 : 0.45,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard
            style={{
              flex: 1,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: rightEnter,
              transform: `translateY(${interpolate(rightEnter, [0, 1], [48, 0])}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.subTitle,
                  fontWeight: 700,
                  lineHeight: TYPOGRAPHY.lineHeightTight,
                  color: COLORS.textPrimary,
                }}
              >
                স্ক্রিপ্ট এডিটর
              </div>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.techCode,
                  fontWeight: 700,
                  color: COLORS.secondary,
                }}
              >
                LIVE EDIT
              </div>
            </div>

            <div
              style={{
                position: "relative",
                padding: "36px 32px",
                borderRadius: RADII.inner,
                backgroundColor: COLORS.bgDeep,
                border: `1.5px solid ${COLORS.borderAccent}`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.uiLabel,
                  fontWeight: 600,
                  lineHeight: TYPOGRAPHY.lineHeightRelaxed,
                  color: COLORS.textPrimary,
                }}
              >
                <span>“আমাদের নতুন ভিডিওতে </span>
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    padding: "2px 12px",
                    borderRadius: 10,
                    backgroundColor: COLORS.accentSoft,
                    color: COLORS.accentBright,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 4,
                      width: `${editHighlight}%`,
                      backgroundColor: COLORS.accent,
                    }}
                  />
                  সবাইকে স্বাগতম
                </span>
                <span>”</span>
                <span
                  style={{
                    display: "inline-block",
                    width: 4,
                    height: 52,
                    marginLeft: 8,
                    verticalAlign: "middle",
                    backgroundColor: COLORS.accentBright,
                    opacity: cursorOpacity,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.body,
                fontWeight: 500,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textSecondary,
              }}
            >
              প্রয়োজনে নিজেই লেখা ঠিক করুন
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
