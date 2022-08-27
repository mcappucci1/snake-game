import { GameBoard } from "./GameBoard";
import { ScoreCounter } from "./ScoreCounter";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/App.css";

export const App = function AppInternal() {
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);

    return (
        <div id="app">
            <h1 className="text-center mt-3 mb-3">Snake Game</h1>
            <ScoreCounter currentScore={currentScore} bestScore={bestScore} />
            <div className="d-flex justify-content-center">
                <GameBoard
                    currentScore={currentScore}
                    setCurrentScore={setCurrentScore}
                    bestScore={bestScore}
                    setBestScore={setBestScore}
                />
            </div>
        </div>
    );
};