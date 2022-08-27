export const enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
export const enum Speed {
    SLOW = 100,
    MEDIUM = 75,
    FAST = 50
}
export const enum ArrowKeys {
    UP = "ArrowUp",
    DOWN = "ArrowDown",
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight",
}

export type SnakeCell = {
    x: number,
    y: number
}

export const SNAKE_START_POSITION: SnakeCell[] = [
    { x: 6, y: 10 },
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
    { x: 2, y: 10}
];
export const NUM_CELLS = 21;

export const getIdFromCoordinate = (coor: SnakeCell) => `${coor.x}-${coor.y}`;
export const addSnakeClass = (coor: SnakeCell) => document.getElementById(getIdFromCoordinate(coor))?.classList.add("snake-cell");
export const removeSnakeClass = (coor: SnakeCell) => document.getElementById(getIdFromCoordinate(coor))?.classList.remove("snake-cell");
export const addFoodClass = (coor: SnakeCell) => document.getElementById(getIdFromCoordinate(coor))?.classList.add("food-cell");
export const removeFoodClass = (coor: SnakeCell) => document.getElementById(getIdFromCoordinate(coor))?.classList.remove("food-cell");
export const getRandomFoodCoordinates = (): SnakeCell => {
    return { x: Math.floor(Math.random() * NUM_CELLS), y: Math.floor(Math.random() * NUM_CELLS) };
}