import { useEffect, useMemo, useState } from "react";

export function useAccessTokenCountdown(params?: { serverNow: number; expiresIn: number }) {

    // mốc hết hạn tuyệt đối theo giờ server (ms)

    const expiresAt = useMemo(() => {
        if (!params) return 0;
        return (params.serverNow + params.expiresIn) * 1000;
    }, [params?.serverNow, params?.expiresIn]);

    // căn lệch giờ client so với server
    const offsetMs = useMemo(() => {
        return params ? Date.now() - params.serverNow * 1000 : 0;
    }, [params?.serverNow]);

    const [secondsLeft, setSecondsLeft] = useState(0);
    const [timeUp, setTimeUp] = useState(false);

    useEffect(() => {
        if (!expiresAt) {
            setSecondsLeft(0);
            return;
        }

        const tick = () => {
            const alignedNow = Date.now() - offsetMs;
            const s = Math.max(0, Math.floor((expiresAt - alignedNow) / 1000));
            setSecondsLeft(s);
            if (s === 0) {
                setTimeUp(true);
                clearInterval(id);
            }
        };

        tick(); // cập nhật ngay
        const id = window.setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [expiresAt, offsetMs]);

    return { secondsLeft, isExpired: secondsLeft === 0, expiresAt, timeUp };
}
