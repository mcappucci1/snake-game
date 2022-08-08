import { Fragment, memo, useMemo } from "react";
import { getIdFromCoordinate, NUM_CELLS } from "../utils/SnakeUtils";

export const GameCells = memo(function GameCellsInternal() {
    const board: JSX.Element[] = useMemo(() => {
        console.log('rebuilding board');
        const boardCells: JSX.Element[][] = [];
        for (let i = 0; i < NUM_CELLS; ++i) {
            boardCells.push([]);
            for (let j = 0; j < NUM_CELLS; ++j) {
                const uniqueId = getIdFromCoordinate({ x: i, y: j});
                boardCells[i].push(<div key={uniqueId} id={uniqueId} className="cell" />);
            }
        }
        return boardCells.map((row, index) => <div key={index} className="cell-row">{row}</div>);
    }, []);

    return (
        <Fragment>
            {board}
        </Fragment>
    );
});