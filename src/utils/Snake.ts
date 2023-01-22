import {
    Direction,
    SNAKE_START_POSITION,
    Cell,
    NUM_GAME_CELLS,
    removeSnakeClass,
    addSnakeClass,
    addFoodClass,
    removeFoodClass,
    oppositeDirection
} from './SnakeGameUtils';




export class Snake {

    snake: Cell[] = [];
    direction: Direction = Direction.DOWN;
    food: Cell = { x: 0, y: 0};

    resetGame() {
        this.resetSnake();
        this.direction = Direction.DOWN;
        this.setNewFood();
    }

    resetSnake() {
        this.snake.forEach((cell) => removeSnakeClass(cell));
        SNAKE_START_POSITION.forEach((cell) => addSnakeClass(cell));
        this.snake = [...SNAKE_START_POSITION];
    }

    generateRandomCell(): Cell {
        return {
            x: Math.floor(Math.random() * NUM_GAME_CELLS), 
            y: Math.floor(Math.random() * NUM_GAME_CELLS)
        };
    }

    getNextHead(): Cell {
        const addToX = this.direction === Direction.UP ? 1 : this.direction === Direction.DOWN ? -1 : 0;
        const addToY = this.direction === Direction.LEFT ? 1 : this.direction === Direction.RIGHT ? -1 : 0;
        return {
            x: this.snake[0].x - addToX,
            y: this.snake[0].y - addToY
        };
    }

    gameIsOver() {
        const head = this.snake[0];
        return (
            head.x < 0 || head.x >= NUM_GAME_CELLS ||
            head.y < 0 || head.y >= NUM_GAME_CELLS ||
            this.snake.slice(1).reduce((acc, cell) => {
                return acc || (cell.x === head.x && cell.y === head.y)
            }, false)
        );
    }

    setNewFood() {
        let newFood = this.generateRandomCell();
        const nextHead = this.getNextHead();
        const hashCell = (cell: Cell) => cell.x * NUM_GAME_CELLS + cell.y;
        const seen = new Set();

        while (true) {
            if (!seen.has(newFood)) {
                let foodNotInSnake = true;
                for (let i = 0; i < this.snake.length && foodNotInSnake; ++i) {
                    const cell = this.snake[i];
                    foodNotInSnake = cell.x !== newFood.x || cell.y !== newFood.y;
                }
                const foodNotNextHead = nextHead.x !== newFood.x || nextHead.y !== newFood.y;
                if (foodNotInSnake && foodNotNextHead) {
                    break;
                }
            }
            seen.add(hashCell(newFood));
            newFood = this.generateRandomCell();
        }
        
        removeFoodClass(this.food);
        addFoodClass(newFood);
        this.food = newFood;
    }

    move() {
        const newHeadOfSnake = this.getNextHead();
        this.snake.unshift(newHeadOfSnake);
        const snakeAteFood = this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
        if (snakeAteFood) {
            removeFoodClass(this.food);
            this.setNewFood();
        } else {
            const removeCell = this.snake.pop();
            removeSnakeClass(removeCell!);
        }
        addSnakeClass(newHeadOfSnake);
    }

    isValidDirectionChange(directionChange: Direction, oppositeDirection: Direction) {
        if (this.direction === directionChange || this.direction === oppositeDirection) {
            return false;
        } else if (directionChange === Direction.UP || directionChange === Direction.DOWN) {
            return this.snake[1].y !== this.snake[0].y;
        } else {
            return this.snake[1].x !== this.snake[0].x;
        }
    }

    changeDirection(direction: Direction) {
        if (this.isValidDirectionChange(direction, oppositeDirection(direction))) {
            this.direction = direction;
        }
    }

    score() {
        return this.snake.length - SNAKE_START_POSITION.length;
    }
}