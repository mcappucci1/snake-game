import "../css/EndGameBanner.css";
import { GameCounter } from "./GameCounter";
import { Speed } from "../utils/SnakeUtils";
import { Fragment, memo, useCallback, useState } from "react";

interface Props {
    handlePlayAgain: () => void;
    handleChangeSpeed: (newSpeed: Speed) => void;
    speed: Speed;
}

export const GameBanner = memo(function GameBannerInternal({ handlePlayAgain, handleChangeSpeed, speed }: Props) {
    const [countdown, setCountdown] = useState(false);

    const handleEndCountdown = useCallback(() => {
        setCountdown(false);
        handlePlayAgain();
    }, []);

    const handleStartCountdown = useCallback(() => {setCountdown(true)}, []);

    return (
        <div id="end-game-banner-container">
            {
                countdown ? <GameCounter endCountdown={handleEndCountdown} /> :
                <Fragment>
                    <button className="d-block mb-3" onClick={handleStartCountdown}>Play Again</button>
                    <select onChange={(event) => handleChangeSpeed(event.target.value as unknown as Speed)} value={speed}>
                        <option value={Speed.SLOW}>Slow</option>
                        <option value={Speed.MEDIUM}>Medium</option>
                        <option value={Speed.FAST}>Fast</option>
                    </select>
                </Fragment>
            }
        </div>
    );
});