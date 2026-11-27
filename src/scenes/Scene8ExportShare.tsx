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
import { GlassCard, SceneFade, WordReveal } from "./shared";

export const Scene8ExportShare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progressPct = interpolate(frame, [10, 56], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASINGS.outExpo,
  });

  const videoCardProg = spring({
    frame: frame - 46,
    fps,
    config: SPRINGS.snappy,
  });
  const audioCardProg = spring({
    frame: frame - 58,
    fps,
    config: SPRINGS.snappy,
  });
  const sharePulse = spring({
    frame: frame - 74,
    fps,
    config: SPRINGS.smooth,
  });

  return (
    <SceneFade durationInFrames={150}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          justifyContent: "space-between",
        }}
      >
        <WordReveal
          text="নামিয়ে নিন ও শেয়ার করুন"
          startFrame={4}
          staggerFrames={5}
          fontSize={TYPOGRAPHY.title}
          maxWidth={1500}
          highlightWords={["নামিয়ে", "শেয়ার"]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flex: 1,
            marginTop: 28,
          }}
        >
          <GlassCard
            accent
            style={{
              width: 740,
              padding: "46px 42px",
              display: "flex",
              flexDirection: "column",
              gap: 30,
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
                এক্সপোর্ট তৈরি
              </div>
              <div
                style={{
                  fontFamily: FONT_STACK,
                  fontSize: TYPOGRAPHY.subTitle,
                  fontWeight: 800,
                  color: COLORS.accentBright,
                }}
              >
                {Math.round(progressPct)}%
              </div>
            </div>

            <div
              style={{
                height: 22,
                borderRadius: RADII.pill,
                backgroundColor: COLORS.bgDeep,
                overflow: "hidden",
                border: `1px solid ${COLORS.borderSubtle}`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  borderRadius: RADII.pill,
                  backgroundColor: COLORS.accent,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                opacity: sharePulse,
                transform: `translateY(${interpolate(sharePulse, [0, 1], [16, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: RADII.pill,
                  backgroundColor: COLORS.accentSoft,
                  border: `1.5px solid ${COLORS.borderAccent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="26" cy="9" r="4" stroke={COLORS.accentBright} strokeWidth="3" />
                  <circle cx="9" cy="18" r="4" stroke={COLORS.accentBright} strokeWidth="3" />
                  <circle cx="26" cy="27" r="4" stroke={COLORS.accentBright} strokeWidth="3" />
                  <line x1="12.5" y1="16" x2="22.5" y2="11" stroke={COLORS.accent} strokeWidth="3" />
                  <line x1="12.5" y1="20" x2="22.5" y2="25" stroke={COLORS.accent} strokeWidth="3" />
                </svg>
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
                সবার সাথে শেয়ারের জন্য প্রস্তুত
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
            <GlassCard
              accent
              style={{
                padding: "36px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: videoCardProg,
                transform: `translateX(${interpolate(videoCardProg, [0, 1], [70, 0])}px)`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.techCode,
                    fontWeight: 700,
                    color: COLORS.accentBright,
                  }}
                >
                  MP4 • 1080P HD
                </div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.subTitle,
                    fontWeight: 700,
                    lineHeight: TYPOGRAPHY.lineHeightTight,
                    color: COLORS.textPrimary,
                  }}
                >
                  ভিডিও ডাউনলোড
                </div>
              </div>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path
                  d="M28 10V36M28 36L17 25M28 36L39 25M12 44H44"
                  stroke={COLORS.accentBright}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </GlassCard>

            <GlassCard
              style={{
                padding: "36px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: audioCardProg,
                transform: `translateX(${interpolate(audioCardProg, [0, 1], [70, 0])}px)`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.techCode,
                    fontWeight: 700,
                    color: COLORS.secondary,
                  }}
                >
                  WAV / MP3 • STUDIO
                </div>
                <div
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: TYPOGRAPHY.subTitle,
                    fontWeight: 700,
                    lineHeight: TYPOGRAPHY.lineHeightTight,
                    color: COLORS.textPrimary,
                  }}
                >
                  অডিও ডাউনলোড
                </div>
              </div>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path
                  d="M28 10V36M28 36L17 25M28 36L39 25M12 44H44"
                  stroke={COLORS.secondary}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </GlassCard>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
