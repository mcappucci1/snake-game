import { GameBoard } from "./GameBoard";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/App.css";




export const App = () => {

    const [currentScore, setCurrentScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);

    return (
        <div id="app">
            <h1 className="text-center mt-3 mb-3">Snake Game</h1>
            <div className="text-center mb-2">
                <h5 className="d-inline me-4">Best Score: <span className="text-success">{bestScore}</span></h5>
                <h5 className="d-inline">Current Score: <span className="text-primary">{currentScore}</span></h5>
            </div>
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