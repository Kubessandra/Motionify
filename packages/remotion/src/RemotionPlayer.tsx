import { Player as RemotionPlayer } from "@remotion/player";
import root from "react-shadow";

const Player: typeof RemotionPlayer = (props) => {
  return (
    <root.div>
      <RemotionPlayer {...props} />
    </root.div>
  );
};

export default Player;
