import { Speed } from "../utils/SnakeUtils";
import { GameBoard } from "./GameBoard";
import { GameSettings } from "./GameSettings";
import { memo, useCallback, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/App.css";

export const App = memo(function AppInternal() {
    return (
        <div id="app">
            <h1 className="text-center my-5">Snake Game</h1>
            <div className="d-flex justify-content-center">
                <GameBoard />
            </div>
        </div>
    );
});