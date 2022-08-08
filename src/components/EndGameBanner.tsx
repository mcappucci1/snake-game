import "../css/EndGameBanner.css";

interface Props {
    handlePlayAgain: () => void;
}

export const EndGameBanner = function EndGameBanner({ handlePlayAgain }: Props) {
    return (
        <div id="end-game-banner-container">
            <h2>Game Over</h2>
            <button onClick={handlePlayAgain}>Play Again</button>
        </div>
    );
}