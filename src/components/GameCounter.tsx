import { memo, useEffect, useState } from "react";

const DEFAULT_COUNTER = 3;

interface Props {
    endCountdown: () => void;
}

export const GameCounter = memo(function GameCounterInternal({ endCountdown }: Props) {
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
    }, []);

    return (
        <h1>{counter}</h1>
    );
});