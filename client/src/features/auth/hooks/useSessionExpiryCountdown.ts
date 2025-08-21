import { useMemo } from "react";
import { useAccessTokenCountdown } from "./useAccessTokenCountdown";

export function useSessionExpiryCountdown(storageKey = "time-ending") {
    const params = useMemo(() => {
        try {
            const raw = sessionStorage.getItem(storageKey);
            if (!raw) return undefined;
            const { serverNow, expiresIn } = JSON.parse(raw) as { serverNow: number; expiresIn: number };
            return { serverNow, expiresIn };
        } catch {
            return undefined;
        }
    }, [storageKey]);

    return useAccessTokenCountdown(params);
}
