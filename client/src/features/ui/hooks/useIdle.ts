import { useState, useEffect, useCallback, useRef } from "react";

export function useIdle(timeout: number) {
  const [isIdle, setIdle] = useState(false);
  const timerId = useRef<number | null>(null);

//   // Stable reset function
  const resetAction = useCallback(() => {
    setIdle(false);

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = window.setTimeout(() => {
        console.log("SAD THU");
        
      setIdle(true);
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    const events = [ "mousedown", "keydown", "scroll", "touchstart"];

    // start first timer
    resetAction();

     // listen user activity
    events.forEach((e) => window.addEventListener(e, resetAction));

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      events.forEach((e) => window.removeEventListener(e, resetAction));
    };
    
}, [resetAction]);

console.log(isIdle);
  return isIdle;
}
