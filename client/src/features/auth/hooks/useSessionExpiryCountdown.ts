import { useState, useEffect } from "react";
import { useAccessTokenCountdown } from "./useAccessTokenCountdown";
import { SessionParams } from "../../../types/ui";
export function useSessionExpiryCountdown(storageKey: string) {
    const read = (): SessionParams => {
        const raw = sessionStorage.getItem(storageKey);
        if (!raw) return undefined;
        const obj = JSON.parse(raw);
        return {
            serverNow: Number(obj.serverNow),
            expiresIn: Number(obj.expiresIn),
        };
    };

    const [params, setParams] = useState<SessionParams>(() => read());

    useEffect(() => {
        const onUpdate = (evt: Event) => {
            const detail = (evt as CustomEvent<SessionParams>).detail;
            setParams(detail ?? read());
        };

        window.addEventListener("token:updated", onUpdate as EventListener);
        return () => window.removeEventListener("token:updated", onUpdate as EventListener);
    }, [storageKey]);

    return useAccessTokenCountdown(params);

}
