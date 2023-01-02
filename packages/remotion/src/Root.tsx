import React from "react";
import { Composition } from "remotion";
import { Welcome } from "./videos/Welcome";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={Welcome.videoId}
        component={Welcome}
        defaultProps={{
          name: "Motionify",
        }}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
