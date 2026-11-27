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
  HighlightSweep,
  SceneFade,
  WordReveal,
} from "./shared";

export const Scene9Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emblemScale = spring({
    frame: frame - 4,
    fps,
    config: SPRINGS.smooth,
  });

  const pillsEnter = spring({
    frame: frame - 52,
    fps,
    config: SPRINGS.gentle,
  });

  const pulse = 0.94 + Math.sin(frame / 10) * 0.06;

  return (
    <SceneFade durationInFrames={157}>
      <AbsoluteFill
        style={{
          padding: "76px 96px",
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
        }}
      >
        <div
          style={{
            transform: `scale(${emblemScale})`,
            opacity: emblemScale,
          }}
        >
          <BrandLogoMark size={136} pulse={pulse} />
        </div>

        <WordReveal
          text="ডাবিং বেস্ট এআই"
          startFrame={12}
          staggerFrames={6}
          fontSize={TYPOGRAPHY.heroTitle}
          align="center"
          maxWidth={1600}
          highlightWords={["বেস্ট", "এআই"]}
          highlightColor={COLORS.accentBright}
        />

        <HighlightSweep
          text="আপনার গল্প, সবার ভাষায়"
          startFrame={34}
          fontSize={TYPOGRAPHY.subTitle}
          maxWidth={1200}
        />

        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 12,
            opacity: pillsEnter,
            transform: `translateY(${interpolate(pillsEnter, [0, 1], [24, 0])}px)`,
          }}
        >
          {["সহজ ডাবিং", "০ ক্রেডিট", "নিখুঁত সিঙ্ক"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "14px 34px",
                borderRadius: RADII.pill,
                backgroundColor: COLORS.surfaceGlass,
                border: `1.5px solid ${COLORS.borderAccent}`,
                fontFamily: FONT_STACK,
                fontSize: TYPOGRAPHY.body,
                fontWeight: 600,
                lineHeight: TYPOGRAPHY.lineHeightTight,
                color: COLORS.textSecondary,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};
