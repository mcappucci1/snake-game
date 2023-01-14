import { memo } from "react";
import "../css/App.css";

interface Props {
    currentScore: number;
    bestScore: number;
}

export const ScoreCounter = memo(function ScoreCounterInternal({ currentScore, bestScore }: Props) {
    return (
        <div className="text-center mb-2">
            <h5 className="d-inline me-4">Best Score: <span className="text-success">{bestScore}</span></h5>
            <h5 className="d-inline">Current Score: <span className="text-primary">{currentScore}</span></h5>
        </div>
    );
});