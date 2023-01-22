import { memo } from 'react';
import { getIdFromCoordinate, NUM_GAME_CELLS } from "../utils/SnakeGameUtils";

export const GameCells = memo(()  => {

    const board: JSX.Element[] = [];
    
    for (let i = 0; i < NUM_GAME_CELLS; ++i) {
        const row: JSX.Element[] = [];
        for (let j = 0; j < NUM_GAME_CELLS; ++j) {
            const uniqueId = getIdFromCoordinate({ x: i, y: j});
            row.push(<div key={uniqueId} id={uniqueId} className="cell" />);
        }
        board.push(<div key={i} className="cell-row">{row}</div>);
    }

    return (
        <>
            {board}
        </>
    );
});