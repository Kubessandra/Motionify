import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DEFAULT_FPS } from "../constants";
import { useCountUp } from "../hooks/useCountUp";

type Timing = "day" | "week" | "month";

interface GithubProps {
  commitNumber?: number;
  timing?: Timing;
}

const getTextTiming = (timing: Timing): string => {
  let text: string;
  switch (timing) {
    case "day":
      text = "Today";
      break;
    case "week":
      text = "This week";
      break;
    case "month":
      text = "This month";
      break;
  }
  return text;
};

export const Github = (props: GithubProps) => {
  const { commitNumber = 32, timing = "month" } = props;
  const { height } = useVideoConfig();
  const frame = useCurrentFrame();

  const valueNumber = useCountUp(commitNumber);

  const spr = spring({
    frame,
    fps: DEFAULT_FPS,
    durationInFrames: 80,
    config: {
      damping: 10,
      stiffness: 80,
    },
  });

  const leftOffset = interpolate(spr, [0, 1], [-600, 100]);
  const bottomOffset = interpolate(spr, [0, 1], [-600, height / 2]);
  const rotate = interpolate(spr, [0, 1], [-90, 0]);

  const sprTiming = spring({
    frame: frame,
    fps: DEFAULT_FPS,
    durationInFrames: 45,
    config: {
      damping: 15,
    },
  });
  const topOffset = interpolate(sprTiming, [0, 1], [height, 90]);

  return (
    <AbsoluteFill
      style={{
        zIndex: 0,
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          zIndex: 2,
        }}
      >
        <h1
          style={{
            margin: 0,
            right: 120,
            top: height / 2,
            position: "absolute",
            fontSize: 128,
            fontWeight: "bold",
            translate: "0 -50%",
          }}
        >
          <span
            style={{
              textShadow: "4px 4px 0 hsl(0deg 0% 42%)",
            }}
          >
            {valueNumber}
          </span>{" "}
          <span
            style={{
              fontSize: "0.7em",
              fontWeight: "normal",
            }}
          >
            commits
          </span>
          <h2
            style={{
              textAlign: "center",
              position: "absolute",
              fontSize: 60,
              fontWeight: "normal",
              top: topOffset,
              left: 0,
              right: 0,
            }}
          >
            {getTextTiming(timing)}
          </h2>
        </h1>
      </div>
      <Img
        style={{
          zIndex: 1,
          position: "absolute",
          translate: "0 50%",
          rotate: `${rotate}deg`,
          left: leftOffset,
          bottom: bottomOffset,
        }}
        src={
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        }
      />
    </AbsoluteFill>
  );
};

Github.templateId = "Github";
