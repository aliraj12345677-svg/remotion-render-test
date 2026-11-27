import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FONT_STACK } from "./fonts";
import { COLORS } from "./theme";
import { MovingBackground } from "./scenes/shared";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Platform } from "./scenes/Scene2Platform";
import { Scene3Upload } from "./scenes/Scene3Upload";
import { Scene4Language } from "./scenes/Scene4Language";
import { Scene5VoiceScript } from "./scenes/Scene5VoiceScript";
import { Scene6ZeroCredit } from "./scenes/Scene6ZeroCredit";
import { Scene7SyncTimeline } from "./scenes/Scene7SyncTimeline";
import { Scene8ExportShare } from "./scenes/Scene8ExportShare";
import { Scene9Outro } from "./scenes/Scene9Outro";

export const Main: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDeep,
        fontFamily: FONT_STACK,
        color: COLORS.textPrimary,
      }}
    >
      <MovingBackground />

      <Sequence from={0} durationInFrames={248}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={248} durationInFrames={135}>
        <Scene2Platform />
      </Sequence>

      <Sequence from={383} durationInFrames={150}>
        <Scene3Upload />
      </Sequence>

      <Sequence from={533} durationInFrames={150}>
        <Scene4Language />
      </Sequence>

      <Sequence from={683} durationInFrames={150}>
        <Scene5VoiceScript />
      </Sequence>

      <Sequence from={833} durationInFrames={150}>
        <Scene6ZeroCredit />
      </Sequence>

      <Sequence from={983} durationInFrames={150}>
        <Scene7SyncTimeline />
      </Sequence>

      <Sequence from={1133} durationInFrames={150}>
        <Scene8ExportShare />
      </Sequence>

      <Sequence from={1283} durationInFrames={157}>
        <Scene9Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
