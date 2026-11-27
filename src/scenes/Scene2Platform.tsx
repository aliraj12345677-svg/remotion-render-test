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
  BrandLogoMark,
  GlassCard,
  SceneFade,
  WordReveal,
} from "./shared";

const PILLARS = [
  { title: "ভিডিও ডাবিং", code: "AI DUBBING", type: "dub" },
  { title: "টেক্সট টু স্পিচ", code: "TEXT TO SPEECH", type: "tts" },
  { title: "স্পিচ টু টেক্সট", code: "SPEECH TO TEXT", type: "stt" },
] as const;

export const Scene2Platform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
  });

  const pulse = 0.94 + Math.sin(frame / 10) * 0.06;

  return (
    <SceneFade durationInFrames={135}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [-24, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <BrandLogoMark size={96} pulse={pulse} />
            <WordReveal
              text="ডাবিং বেস্ট এআই"
              startFrame={4}
              staggerFrames={5}
              fontSize={TYPOGRAPHY.heroTitle}
              highlightWords={["বেস্ট", "এআই"]}
              highlightColor={COLORS.accentBright}
            />
          </div>
          <div
            style={{
              fontFamily: FONT_STACK,
              fontSize: TYPOGRAPHY.body,
              fontWeight: 500,
              lineHeight: TYPOGRAPHY.lineHeightRelaxed,
              color: COLORS.textSecondary,
              textAlign: "center",
            }}
          >
            একটাই জায়গায় সম্পূর্ণ এআই অডিও স্টুডিও
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {PILLARS.map((pillar, idx) => {
            const cardProg = spring({
              frame: frame - (22 + idx * 10),
              fps,
              config: SPRINGS.snappy,
            });
            const cardY = interpolate(cardProg, [0, 1], [60, 0]);

            return (
              <GlassCard
                key={pillar.code}
                accent={idx === 0}
                style={{
                  flex: 1,
                  maxWidth: 530,
                  padding: "46px 38px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 28,
                  opacity: cardProg,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <div
                  style={{
                    width: 108,
                    height: 108,
                    borderRadius: RADII.card,
                    backgroundColor: COLORS.accentSoft,
                    border: `1.5px solid ${COLORS.borderAccent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pillar.type === "dub" && (
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
                      <polygon
                        points="26,24 42,32 26,40"
                        fill={COLORS.accent}
                      />
                    </svg>
                  )}
                  {pillar.type === "tts" && (
                    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                      <path
                        d="M14 26H24L38 14V50L24 38H14V26Z"
                        stroke={COLORS.accentBright}
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M46 22C50 26 50 38 46 42"
                        stroke={COLORS.accent}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M52 16C58 24 58 40 52 48"
                        stroke={COLORS.secondary}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {pillar.type === "stt" && (
                    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                      <rect
                        x="24"
                        y="10"
                        width="16"
                        height="28"
                        rx="8"
                        stroke={COLORS.accentBright}
                        strokeWidth="4"
                      />
                      <path
                        d="M16 30C16 38.837 23.163 46 32 46C40.837 46 48 38.837 48 30"
                        stroke={COLORS.accent}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <line
                        x1="32"
                        y1="46"
                        x2="32"
                        y2="56"
                        stroke={COLORS.accent}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.techCode,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: COLORS.accentBright,
                  }}
                >
                  {pillar.code}
                </div>

                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.body,
                    fontWeight: 700,
                    lineHeight: TYPOGRAPHY.lineHeightTight,
                    color: COLORS.textPrimary,
                    textAlign: "center",
                  }}
                >
                  {pillar.title}
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center", height: 34 }}>
                  {Array.from({ length: 9 }).map((_, b) => {
                    const h =
                      12 + Math.abs(Math.sin(frame / 7 + b * 0.8 + idx)) * 22;
                    return (
                      <div
                        key={b}
                        style={{
                          width: 8,
                          height: h,
                          borderRadius: RADII.pill,
                          backgroundColor:
                            idx === 0 ? COLORS.accentBright : COLORS.secondary,
                          opacity: 0.75,
                        }}
                      />
                    );
                  })}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
