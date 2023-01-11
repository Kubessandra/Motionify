import { Player as RemotionPlayer } from "@remotion/player";
import root from "react-shadow";

const Player: typeof RemotionPlayer = (props) => {
  return (
    <root.div>
      {/* @ts-expect-error props are the same bug typescript */}
      <RemotionPlayer {...props} />
    </root.div>
  );
};

export default Player;
