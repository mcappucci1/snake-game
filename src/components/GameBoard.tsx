import { memo, useCallback, useEffect, useState } from "react";
import {
    addFoodClass,
    addSnakeClass,
    ArrowKeys,
    Direction,
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
    const [food, setFood] = useState<SnakeCell>({ x: 0, y: 0});
    const [gameOver, setGameOver] = useState<boolean>(true);
    const [speed, setSpeed] = useState<Speed>(Speed.MEDIUM);

    const handleChangeSpeed = useCallback((newSpeed: Speed) => {
        if (newSpeed !== speed) {
            setSpeed(newSpeed);
        }
    }, [speed]);

    const isGameOver = () => {
        const head = snake[0];
        if (head.x < 0 || head.x >= NUM_CELLS || head.y < 0 || head.y >= NUM_CELLS) {
            return true;
        }
        return snake.slice(1).reduce((acc, cell) => {
            return acc || (cell.x === head.x && cell.y === head.y); 
        }, false);
    }

    const didSnakeEat = () => snake[0].x === food!.x && snake[0].y === food!.y;

    const handleMoveSnake = () => {
        if (gameOver) {
            return;
        }
        let movedSnake: SnakeCell[];
        if (snakeDirection === Direction.UP) {
            movedSnake = [{ x: snake[0].x - 1, y: snake[0].y }, ...snake.slice(0,-1)];
        } else if (snakeDirection === Direction.DOWN) {
            movedSnake = [{ x: snake[0].x + 1, y: snake[0].y }, ...snake.slice(0,-1)];
        } else if (snakeDirection === Direction.LEFT) {
            movedSnake = [{ x: snake[0].x, y: snake[0].y - 1 }, ...snake.slice(0,-1)];
        } else {
            movedSnake = [{ x: snake[0].x, y: snake[0].y + 1 }, ...snake.slice(0,-1)];
        }
        if (isGameOver()) {
            setGameOver(true);
        } else if (didSnakeEat()) {
            removeFoodClass(food!);
            createFood();
            movedSnake.push(snake[snake.length-1]);
        } else {
            removeSnakeClass(snake[snake.length-1]);
        }
        addSnakeClass(movedSnake[0]);
        setSnake(movedSnake);
    };

    const isValidDirectionChange = (dir: Direction, opp: Direction) => {
        if (snakeDirection === dir || snakeDirection === opp) {
            return false;
        } else if (dir === Direction.UP || dir === Direction.DOWN) {
            return snake[1].y !== snake[0].y
        } else {
            return snake[1].x !== snake[0].x
        }
    };

    const handleDirectionChange = (event: KeyboardEvent) => {
        const { key } = event;
        if (key === ArrowKeys.UP && isValidDirectionChange(Direction.UP, Direction.DOWN)) {
            setSnakeDirection(Direction.UP);
        } else if (key === ArrowKeys.DOWN && isValidDirectionChange(Direction.DOWN, Direction.UP)) {
            setSnakeDirection(Direction.DOWN);
        } else if (key === ArrowKeys.LEFT && isValidDirectionChange(Direction.LEFT, Direction.RIGHT)) {
            setSnakeDirection(Direction.LEFT);
        } else if (key === ArrowKeys.RIGHT && isValidDirectionChange(Direction.RIGHT, Direction.LEFT)) {
            setSnakeDirection(Direction.RIGHT);
        }
    };

    const initializeSnake = useCallback(() => SNAKE_START_POSITION.forEach((cell) => addSnakeClass(cell)), []);

    const createFood = () => {
        console.log("create");
        let newFood = getRandomFoodCoordinates();
        while (true) {
            if (snake.reduce((acc, cell) => acc || (cell.x !== newFood.x || cell.y !== newFood.y), false)) {
                break;
            }
           newFood = getRandomFoodCoordinates();
        }
        setFood(newFood);
        addFoodClass(newFood);
    }

    const clearBoard = useCallback(() => {
        console.log(food);
        if (food != null) removeFoodClass(food);
        snake.forEach((cell) => {
            removeSnakeClass(cell);
        })
    }, [food, snake]);

    const handlePlayAgain = useCallback(() => {
        clearBoard();
        setSnake(SNAKE_START_POSITION);
        initializeSnake();
        createFood();
        if (snakeDirection !== Direction.DOWN) {
            setSnakeDirection(Direction.DOWN);
        }
        setGameOver(false);
    }, [clearBoard, snakeDirection]);

    useEffect(() => {
        const intervalKey = setInterval(handleMoveSnake, speed);
        document.addEventListener("keydown", handleDirectionChange);
        return () => {
            clearInterval(intervalKey);
            document.removeEventListener("keydown", handleDirectionChange);
        }
    }, [speed, handleMoveSnake]);

    useEffect(() => {
        initializeSnake();
    }, []);

    return (
        <div id="game-board-container">
            {gameOver && <GameBanner handlePlayAgain={handlePlayAgain} handleChangeSpeed={handleChangeSpeed} speed={speed}/>}
            <GameCells />
        </div>
    );
});