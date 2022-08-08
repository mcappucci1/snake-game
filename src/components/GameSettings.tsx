import { memo } from "react";
import { Speed } from "../utils/SnakeUtils";
import "../css/GameSettings.css";

interface Props {
    handleChangeSpeed: (newSpeed: Speed) => void;
}

export const GameSettings = memo(function GameSettingsInternal({ handleChangeSpeed }: Props) {
    return (
        <div id="game-settings-container">
            yeet
        </div>
    );
});