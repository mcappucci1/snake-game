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
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export type Cell = {
    x: number,
    y: number
}

export const SNAKE_START_POSITION: Cell[] = [
    { x: 6, y: 10 },
    { x: 5, y: 10 },
    { x: 4, y: 10 },
    { x: 3, y: 10 },
    { x: 2, y: 10}
];

export const NUM_GAME_CELLS = 21;

export const getIdFromCoordinate = (coor: Cell) => {
    return `${coor.x}-${coor.y}`;
}

export const addSnakeClass = (coor: Cell) => {
    document.getElementById(getIdFromCoordinate(coor))?.classList.add("snake-cell");
}

export const removeSnakeClass = (coor: Cell) => {
    document.getElementById(getIdFromCoordinate(coor))?.classList.remove("snake-cell");
}

export const addFoodClass = (coor: Cell) => {
    document.getElementById(getIdFromCoordinate(coor))?.classList.add("food-cell");
}

export const removeFoodClass = (coor: Cell) => {
    document.getElementById(getIdFromCoordinate(coor))?.classList.remove("food-cell");
}