import React from "react";
import { Composition } from "remotion";
import { Welcome } from "./templates";

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
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
