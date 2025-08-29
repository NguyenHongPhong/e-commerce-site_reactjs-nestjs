import { useEffect, useState } from "react";

type CountdownProps = {
    hours: number;
    minutes: number;
    seconds: number;
};

export default function Countdown({ hours, minutes, seconds }: CountdownProps) {
    const [time, setTime] = useState(
        hours * 3600 + minutes * 60 + seconds
    );

    useEffect(() => {
        if (time <= 0) return;
        const timer = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    const formatTime = (value: number) => String(value).padStart(2, "0");

    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    return (
        <div className="flex gap-2">
            <span className="bg-black text-white px-3 py-1 rounded-md text-lg font-mono">
                {formatTime(h)}
            </span>
            <span className="bg-black text-white px-3 py-1 rounded-md text-lg font-mono">
                {formatTime(m)}
            </span>
            <span className="bg-black text-white px-3 py-1 rounded-md text-lg font-mono">
                {formatTime(s)}
            </span>
        </div>
    );
}
