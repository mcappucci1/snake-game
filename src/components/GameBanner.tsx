import "../css/EndGameBanner.css";
import { Speed } from "../utils/SnakeUtils";
import { memo } from "react";

interface Props {
    handlePlayAgain: () => void;
    handleChangeSpeed: (newSpeed: Speed) => void;
    speed: Speed;
}

export const GameBanner = memo(function GameBannerInternal({ handlePlayAgain, handleChangeSpeed, speed }: Props) {
    return (
        <div id="end-game-banner-container">
            <button className="d-block mb-3" onClick={handlePlayAgain}>Play Again</button>
            <select onChange={(event) => handleChangeSpeed(event.target.value as unknown as Speed)} value={speed}>
                <option value={Speed.SLOW}>Slow</option>
                <option value={Speed.MEDIUM}>Medium</option>
                <option value={Speed.FAST}>Fast</option>
            </select>
        </div>
    );
});