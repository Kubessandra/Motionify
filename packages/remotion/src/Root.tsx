import React from "react";
import { Composition } from "remotion";
import { DEFAULT_FPS } from "./constants";
import { Github, Welcome } from "./templates";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={Welcome.templateId}
        component={Welcome}
        defaultProps={{
          name: "Motionify",
          color: "black",
        }}
        durationInFrames={120}
        fps={DEFAULT_FPS}
        width={1280}
        height={720}
      />
      <Composition
        id={Github.templateId}
        component={Github}
        defaultProps={{
          commitNumber: 30,
          timing: "week",
        }}
        durationInFrames={6 * DEFAULT_FPS}
        fps={DEFAULT_FPS}
        width={1280}
        height={720}
      />
    </>
  );
};
