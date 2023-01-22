import { useCallback, useEffect, useState } from "react";
import { Snake } from '../utils/Snake';
import { Direction, Speed } from "../utils/SnakeGameUtils";
import { GameCells } from "./GameCells";
import { GameBanner } from "./GameBanner";
import "../css/GameBoard.css";


interface Props {
    currentScore: number;
    setCurrentScore: (score: number) => void;
    bestScore: number;
    setBestScore: (score: number) => void;
}


export const GameBoard = ({ currentScore, setCurrentScore, bestScore, setBestScore }: Props) => {
    
    const [snake] = useState<Snake>(new Snake());
    const [gameOver, setGameOver] = useState<boolean>(true);
    const [speed, setSpeed] = useState<Speed>(Speed.SLOW);


    const handleChangeSpeed = useCallback((newSpeed: Speed) => {
        if (newSpeed !== speed) {
            setSpeed(newSpeed);
        }
    }, [speed]);


    const handleSetBoard = useCallback(() => {
        snake.resetGame();
        setCurrentScore(0);
    }, [setCurrentScore, snake]);


    const handleStartGame = useCallback(() => {
        setGameOver(false);
    }, [setGameOver]);


    const handleDirectionChange = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            snake.changeDirection(Direction.UP);
        } else if (event.key === 'ArrowDown') {
            snake.changeDirection(Direction.DOWN);
        } else if (event.key === 'ArrowLeft') {
            snake.changeDirection(Direction.LEFT);
        } else if (event.key === 'ArrowRight') {
            snake.changeDirection(Direction.RIGHT);
        }
    }, [snake]);


    const handleMoveSnake = useCallback(() => {
        if (!gameOver) {
            snake.move();
            const score = snake.score();
            if (score !== currentScore) {
                setCurrentScore(score);
                if (score > bestScore) {
                    setBestScore(score);
                }
            }
        }
        if (snake.gameIsOver()) {
            setGameOver(true);
        }
    }, [snake, gameOver, currentScore, setCurrentScore, bestScore, setBestScore]);


    useEffect(() => {
        const intervalKey = setInterval(handleMoveSnake, speed);
        document.addEventListener('keydown', handleDirectionChange);
        return () => {
            clearInterval(intervalKey);
            document.removeEventListener('keydown', handleDirectionChange);
        }
    }, [speed, handleMoveSnake, handleDirectionChange]);


    useEffect(() => {
        snake.resetSnake();
    }, [snake])

    
    return (
        <div id="game-board-container">
            { gameOver && <GameBanner 
                handleSetBoard={handleSetBoard} 
                handleStartGame={handleStartGame} 
                handleChangeSpeed={handleChangeSpeed} 
                speed={speed}/>
            }
            <GameCells />
        </div>
    );
};