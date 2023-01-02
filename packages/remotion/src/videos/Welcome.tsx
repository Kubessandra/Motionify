import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface WelcomeProps {
  name: string;
}

export const Welcome = (props: WelcomeProps) => {
  const { name } = props;
  const { height } = useVideoConfig();
  const frame = useCurrentFrame();

  const spr = spring({
    frame,
    fps: 30,
    durationInFrames: 60,
  });

  const offset = interpolate(spr, [0, 1], [-50, height / 2]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: offset,
          justifyContent: "end",
          transform: `translateY(50%)`,
        }}
      >
        <h1
          style={{
            fontSize: 126,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {name}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

Welcome.videoId = "Welcome";
