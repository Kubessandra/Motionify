import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DEFAULT_FPS } from "../constants";

export interface WelcomeProps {
  name: string;
  color: string;
}

export const Welcome = (props: WelcomeProps) => {
  const { name = "test", color = "black" } = props;
  const { height } = useVideoConfig();
  const frame = useCurrentFrame();

  const spr = spring({
    frame,
    fps: DEFAULT_FPS,
    durationInFrames: 2 * DEFAULT_FPS,
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
            color,
          }}
        >
          {name}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

Welcome.templateId = "Welcome" as const;
