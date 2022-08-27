import "../css/GameBanner.css";
import { GameCounter } from "./GameCounter";
import { Speed } from "../utils/SnakeUtils";
import { Fragment, memo, useCallback, useState } from "react";

interface Props {
    handleSetBoard: () => void;
    handleStartGame: () => void;
    handleChangeSpeed: (newSpeed: Speed) => void;
    speed: Speed;
}

export const GameBanner = memo(function GameBannerInternal({
    handleSetBoard,
    handleStartGame,
    handleChangeSpeed,
    speed
}: Props) {
    const [countdown, setCountdown] = useState(false);

    const handleEndCountdown = useCallback(() => {
        setCountdown(false);
        handleStartGame();
    }, []);

    const handleStartCountdown = useCallback(() => {
        setCountdown(true);
        handleSetBoard();
    }, []);

    return (
        <div id="end-game-banner-container">
            {
                countdown ? <GameCounter endCountdown={handleEndCountdown} /> :
                <Fragment>
                    <button className="d-block mb-3 mx-auto snake-btn" onClick={handleStartCountdown}>Play</button>
                    <select
                        className="snake-select pb-1"
                        onChange={(e) => handleChangeSpeed(e.target.value as unknown as Speed)}
                        value={speed}
                    >
                        <option value={Speed.SLOW}>Slow</option>
                        <option value={Speed.MEDIUM}>Medium</option>
                        <option value={Speed.FAST}>Fast</option>
                    </select>
                </Fragment>
            }
        </div>
    );
});