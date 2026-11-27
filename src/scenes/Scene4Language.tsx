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
  HighlightSweep,
  SceneFade,
  WordReveal,
} from "./shared";

const LANGUAGES = [
  { name: "ইংরেজি", code: "EN" },
  { name: "বাংলা", code: "BN" },
  { name: "আরবি", code: "AR" },
] as const;

export const Scene4Language: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame: frame - 6,
    fps,
    config: SPRINGS.smooth,
  });

  const selectProgress = spring({
    frame: frame - 46,
    fps,
    config: SPRINGS.snappy,
  });

  const cursorY = interpolate(selectProgress, [0, 1], [120, 250]);

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
            STEP 02
          </div>

          <WordReveal
            text="কাঙ্ক্ষিত ভাষা বেছে নিন"
            startFrame={8}
            staggerFrames={5}
            fontSize={TYPOGRAPHY.title}
            maxWidth={740}
            highlightWords={["ভাষা"]}
          />

          <HighlightSweep
            text="যেমন: প্রাণবন্ত বাংলা"
            startFrame={48}
            fontSize={TYPOGRAPHY.subTitle}
            maxWidth={740}
          />
        </div>

        <GlassCard
          accent
          style={{
            position: "relative",
            width: 880,
            padding: 42,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            opacity: cardEnter,
            transform: `translateX(${interpolate(cardEnter, [0, 1], [60, 0])}px)`,
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
                fontSize: TYPOGRAPHY.body,
                fontWeight: 700,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textPrimary,
              }}
            >
              টার্গেট ভাষা
            </div>
            <div
              style={{
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.techCode,
                fontWeight: 700,
                color: COLORS.accentBright,
              }}
            >
              40+ LANGUAGES
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {LANGUAGES.map((lang) => {
              const isBangla = lang.code === "BN";
              const active = isBangla ? selectProgress : 0;

              return (
                <div
                  key={lang.code}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 32px",
                    borderRadius: RADII.inner,
                    backgroundColor:
                      active > 0.5 ? COLORS.accentSoft : COLORS.surfaceMuted,
                    border: `2px solid ${
                      active > 0.5 ? COLORS.accent : COLORS.borderSubtle
                    }`,
                    transform: `scale(${1 + active * 0.025})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <div
                      style={{
                        padding: "8px 18px",
                        borderRadius: RADII.pill,
                        backgroundColor:
                          active > 0.5 ? COLORS.accent : COLORS.bgElevated,
                        fontFamily: FONT_STACK,
                        fontSize: TYPOGRAPHY.techCode,
                        fontWeight: 800,
                        color:
                          active > 0.5 ? COLORS.textOnAccent : COLORS.textMuted,
                      }}
                    >
                      {lang.code}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_STACK,
                        fontSize: TYPOGRAPHY.uiLabel,
                        fontWeight: 700,
                        lineHeight: TYPOGRAPHY.lineHeightTight,
                        color: COLORS.textPrimary,
                      }}
                    >
                      {lang.name}
                    </div>
                  </div>

                  {isBangla ? (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: RADII.pill,
                        backgroundColor: COLORS.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: selectProgress,
                        transform: `scale(${selectProgress})`,
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M6 14.5L11.5 20L22 8.5"
                          stroke={COLORS.textOnAccent}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div
            style={{
              position: "absolute",
              right: 130,
              top: cursorY,
              pointerEvents: "none",
              opacity: interpolate(frame, [20, 32], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <svg width="42" height="42" viewBox="0 0 36 36" fill="none">
              <path
                d="M6 4L30 16L18 20L14 32L6 4Z"
                fill={COLORS.textPrimary}
                stroke={COLORS.bgDeep}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </GlassCard>
      </AbsoluteFill>
    </SceneFade>
  );
};
