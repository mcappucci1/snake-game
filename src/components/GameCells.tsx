import { useMemo } from "react";
import { getIdFromCoordinate, NUM_GAME_CELLS } from "../utils/SnakeGameUtils";

export const GameCells = ()  => {
    const board: JSX.Element[] = useMemo(() => {
        const boardCells: JSX.Element[][] = [];
        for (let i = 0; i < NUM_GAME_CELLS; ++i) {
            boardCells.push([]);
            for (let j = 0; j < NUM_GAME_CELLS; ++j) {
                const uniqueId = getIdFromCoordinate({ x: i, y: j});
                boardCells[i].push(<div key={uniqueId} id={uniqueId} className="cell" />);
            }
        }
        return boardCells.map((row, index) => <div key={index} className="cell-row">{row}</div>);
    }, []);

    return (
        <>
            {board}
        </>
    );
};