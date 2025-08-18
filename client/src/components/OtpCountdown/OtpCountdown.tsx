import { useState, useEffect, useRef } from "react";
import { OtpCountdownProps } from "../../types/ui";

const OtpCountdown: React.FC<OtpCountdownProps> = ({ initialSeconds, onExpire, otpVerify, reSendOtp, onNonExpire }) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const firedRef = useRef(0);

    useEffect(() => {
        setSecondsLeft(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const id = setInterval(() => {
            setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(id);
    }, [secondsLeft]);




    useEffect(() => {
        if (secondsLeft === 0) {
            onExpire?.();
        } else if (secondsLeft !== 0 && firedRef.current == 0) {
            onNonExpire?.();
        }



    }, [secondsLeft, onExpire, reSendOtp]);

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
