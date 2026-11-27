import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Main } from "./Main";

// 48 s at 30 fps for the sample SRT. The app will set this from the SRT's last cue.
export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={1440} fps={30} width={1920} height={1080} />
);
