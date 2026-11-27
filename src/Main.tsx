import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, continueRender, delayRender } from "remotion";

const handle = delayRender("fonts");
Promise.all([
  new FontFace("BN", `url(${staticFile("fonts/bn-700.woff2")})`, { weight: "700" }).load(),
  new FontFace("BN", `url(${staticFile("fonts/bn-400.woff2")})`, { weight: "400" }).load(),
]).then((fs) => { fs.forEach((f) => document.fonts.add(f)); continueRender(handle); });

const Scene: React.FC<{ title: string; sub: string; bg: string }> = ({ title, sub, bg }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14 } });
  const o = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: bg, alignItems: "center", justifyContent: "center", fontFamily: "BN" }}>
      <div style={{ color: "#fff", fontSize: 120, fontWeight: 700, transform: `translateY(${(1 - s) * 60}px)`, opacity: o }}>{title}</div>
      <div style={{ color: "#CFF7F1", fontSize: 54, marginTop: 24, opacity: o }}>{sub}</div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={75}><Scene title="ডাবিং বেস্ট এআই" sub="রেন্ডার পরীক্ষা: যুক্তাক্ষর — ক্ষ, শ্র, স্ত্র, দ্ধ" bg="linear-gradient(135deg,#0B3D3A,#1FCFB8)" /></Sequence>
    <Sequence from={75} durationInFrames={75}><Scene title="পরীক্ষা সফল" sub="GitHub Actions থেকে তৈরি ভিডিও" bg="linear-gradient(135deg,#111,#0F9C8A)" /></Sequence>
  </AbsoluteFill>
);
