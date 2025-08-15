import { useState, useEffect } from "react";
import { OtpCountdownProps } from "../../types/ui";

const OtpCountdown: React.FC<OtpCountdownProps> = ({ initialSeconds, onExpire, otpVerify, reSendOtp }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    // Update secondsLeft khi initialSeconds thay đổi từ parent
    useEffect(() => {
        setSecondsLeft(initialSeconds);
    }, [initialSeconds]);

    // Interval countdown
    useEffect(() => {
        if (secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (onExpire) onExpire();
                    reSendOtp?.(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, onExpire]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="text-zinc-400 text-lg text-center">
            This OTP will expire in{" "}
            {otpVerify ? (
                <strong className="text-red-500">0:00</strong>
            ) : (
                <strong className="text-blue-600">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                </strong>
            )}{" "}
            {minutes > 0 ? "minutes" : "seconds"}
        </div>

    );
};

export default OtpCountdown;
