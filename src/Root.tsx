import React from "react";
import { AbsoluteFill, Audio, Composition, staticFile } from "remotion";
import "./fonts";
import { Main } from "./Main";
import job from "./job.json";

// Size, length and audio come from src/job.json, written by the app for every job.
const Entry: React.FC = () => (
  <AbsoluteFill>
    <Main />
    {job.hasAudio ? <Audio src={staticFile("voiceover.mp3")} /> : null}
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Entry}
    durationInFrames={job.durationInFrames}
    fps={job.fps}
    width={job.width}
    height={job.height}
  />
);
