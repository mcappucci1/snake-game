import { memo, useCallback, useEffect, useState } from "react";
import {
    addFoodClass,
    addSnakeClass,
    ArrowKeys,
    Direction,
    getIdFromCoordinate,
    getRandomFoodCoordinates,
    NUM_CELLS,
    removeSnakeClass,
    Speed,
    SnakeCell,
    SNAKE_START_POSITION,
    removeFoodClass
} from "../utils/SnakeUtils";
import { GameCells } from "./GameCells";
import { GameBanner } from "./GameBanner";
import "../css/GameBoard.css";

export const GameBoard = memo(function GameBoardInternal() {
    const [snake, setSnake] = useState<SnakeCell[]>(SNAKE_START_POSITION);
    const [snakeDirection, setSnakeDirection] = useState<Direction>(Direction.DOWN);
    const [food, setFood] = useState<SnakeCell>();
    const [gameOver, setGameOver] = useState<boolean>(true);
    const [speed, setSpeed] = useState<Speed>(Speed.MEDIUM);

    const handleChangeSpeed = useCallback((newSpeed: Speed) => {
        if (newSpeed !== speed) setSpeed(newSpeed);
    }, [speed]);

    const isGameOver = () => {
        const head = snake[0];
        const over = (head.x < 0 || head.x >= NUM_CELLS || head.y < 0 || head.y >= NUM_CELLS) ||
            snake.slice(1).reduce((acc, cell) => acc || (cell.x === head.x && cell.y === head.y), false);
        if (over) setGameOver(true);
        return over;
    }

    const didSnakeEat = (movedSnake: SnakeCell[]) => movedSnake[0].x === food!.x && movedSnake[0].y === food!.y;

    const getNextHead = useCallback(() => {
        return [
            snakeDirection === Direction.UP ? -1 : snakeDirection === Direction.DOWN ? 1 : 0,
            snakeDirection === Direction.LEFT ? -1 : snakeDirection === Direction.RIGHT ? 1 : 0
        ];
    }, [snakeDirection]);

    const handleMoveSnake = () => {
        if (gameOver || isGameOver()) return;
        let movedSnake: SnakeCell[];
        let [_x, _y] = getNextHead();
        movedSnake = [{ x: snake[0].x + _x, y: snake[0].y + _y }, ...snake.slice(0,-1)];
        if (didSnakeEat(movedSnake)) {
            removeFoodClass(food!);
            movedSnake.push(snake[snake.length-1]);
            createFood();
        } else removeSnakeClass(snake[snake.length-1]);
        addSnakeClass(movedSnake[0]);
        setSnake(movedSnake);
    };

    const isValidDirectionChange = (dir: Direction, opp: Direction) => {
        if (snakeDirection === dir || snakeDirection === opp) return false;
        else if (dir === Direction.UP || dir === Direction.DOWN) return snake[1].y !== snake[0].y;
        return snake[1].x !== snake[0].x;
    };

    const handleDirectionChange = (event: KeyboardEvent) => {
        const { key } = event;
        if (key === ArrowKeys.UP && isValidDirectionChange(Direction.UP, Direction.DOWN)) setSnakeDirection(Direction.UP);
        else if (key === ArrowKeys.DOWN && isValidDirectionChange(Direction.DOWN, Direction.UP)) setSnakeDirection(Direction.DOWN);
        else if (key === ArrowKeys.LEFT && isValidDirectionChange(Direction.LEFT, Direction.RIGHT)) setSnakeDirection(Direction.LEFT);
        else if (key === ArrowKeys.RIGHT && isValidDirectionChange(Direction.RIGHT, Direction.LEFT)) setSnakeDirection(Direction.RIGHT);
    };

    const initializeSnake = useCallback(() => SNAKE_START_POSITION.forEach((cell) => addSnakeClass(cell)), []);

    const createFood = () => {
        let newFood = getRandomFoodCoordinates();
        const nextHead = getNextHead();
        const seen = new Set();
        while (true) {
            if (!seen.has(getIdFromCoordinate(newFood))) {
                const foodNotInSnake = snake.reduce((acc, cell) => acc && (cell.x !== newFood.x || cell.y !== newFood.y), true);
                const foodNotNextHead = snake[0].x + nextHead[0] !== newFood.x || snake[0].y + nextHead[1] !== newFood.y;
                if (foodNotInSnake && foodNotNextHead) break;
            }
            seen.add(getIdFromCoordinate(newFood));
            newFood = getRandomFoodCoordinates();
        }
        setFood(newFood);
        addFoodClass(newFood);
    }

    const clearBoard = useCallback(() => {
        if (food != null) removeFoodClass(food);
        snake.forEach((cell) => removeSnakeClass(cell));
    }, [food, snake]);

    const handleSetBoard = useCallback(() => {
        clearBoard();
        setSnake(SNAKE_START_POSITION);
        initializeSnake();
        setSnakeDirection(Direction.DOWN);
    }, [clearBoard, snakeDirection, snake, food]);

    const handleStartGame = useCallback(() => {
        setGameOver(false);
        createFood();
    }, []);

    useEffect(() => {
        const intervalKey = setInterval(handleMoveSnake, speed);
        document.addEventListener("keydown", handleDirectionChange);
        return () => {
            clearInterval(intervalKey);
            document.removeEventListener("keydown", handleDirectionChange);
        }
    }, [speed, handleMoveSnake]);

    useEffect(() => handleSetBoard(), []);

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
});