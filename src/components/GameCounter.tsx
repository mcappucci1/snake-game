import { useEffect, useState } from "react";
import { DEFAULT_COUNTER } from "../utils/SnakeGameUtils";

interface Props {
    endCountdown: () => void;
}

export const GameCounter = ({ endCountdown }: Props) => {

    const [counter, setCounter] = useState(DEFAULT_COUNTER);

    useEffect(() => {
        let count = DEFAULT_COUNTER;
        const timer = setInterval(() => {
            if (count === 1) {
                endCountdown();
            } else {
                setCounter(--count);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [endCountdown]);

    return (
        <div className='d-flex w-100 h-100 align-items-center justify-content-center'>
            <h1>{counter}</h1>
        </div>
    );
};