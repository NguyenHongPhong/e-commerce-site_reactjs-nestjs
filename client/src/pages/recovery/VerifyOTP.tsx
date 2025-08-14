
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "../../hooks";
import { disableLoading, enableLoading } from "../../reducers/loading";
import { notify } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { IOtpInput } from "../../types/ui";
import { AxiosError } from 'axios';
import { IOtp } from "../../types/dto/login-user.dto";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { verifyOTP } from "../../api/otp";
import OtpCountdown from "../../components/OtpCountdown/OtpCountdown";
import { deleteOtpHasExpired } from "../../api/otp";


export default function () {
    const [otpInput, setOtpInput] = useState<string>("");
    const dispatch = useAppDispatch();
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const navigate = useNavigate();
    const handleOtpIsExpired = async () => {
        const timeRemaining = localStorage.getItem("time-remaining");
        if (timeRemaining) {
            localStorage.removeItem("time-remaining");
        };
        try {
            await deleteOtpHasExpired();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timeRemaining = localStorage.getItem("time-remaining");
        if (timeRemaining) {
            setTimeLeft((Number(timeRemaining) * 60) - 10);
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IOtpInput>();


    const onSubmit = async (data: IOtpInput) => {
        const otpCode: IOtp = {
            otp: data.otp as string,
        }

        try {
            dispatch(enableLoading());
            const res = await verifyOTP(otpCode.otp);
            setTimeout(async () => {
                dispatch(disableLoading());
                notify(res.data.message, "success");
            }, 2000);
        } catch (err) {
            const error = err as AxiosError;
            const message = (error.response?.data as any)?.message;
            console.error("Error creating user:", message);
            dispatch(disableLoading());
            notify(message, "error");
        }
    };

    return (
        <div className="flex justify-center flex-col items-center mb-20">
            <img className="h-1/4 w-2/4"
                src="../../../public/ui/images/recovery/verification-otp.png" alt="password-reset-icon" />
            <h3 className="font-semibold text-4xl my-5">OTP verification</h3>
            <p className="text-lg">OTP code has sent to your email. Check it out, please.</p>
            <p className="text-lg"> Enter your OTP below here</p>

            <form className="flex justify-center w-4/5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10 flex flex-col gap-3 w-full">

                    {/* Email */}
                    <div className="input-style">
                        <input
                            {...register("otp", {
                                required: "OTP is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "OTP must be a number",
                                },
                                minLength: {
                                    value: 6,
                                    message: "OTP must be exactly 6 digits",
                                },
                                maxLength: {
                                    value: 6,
                                    message: "OTP must be exactly 6 digits",
                                },
                            })}
                            value={otpInput}
                            className="input-field"
                            type="text" // dùng text để tránh 0 ở đầu bị mất
                            placeholder="Enter your OTP"
                            onChange={(e) => setOtpInput(e.target.value)}
                        />

                        <FontAwesomeIcon icon={faShield} />
                    </div>
                    {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}



                    {/* Submit Button */}
                    <button type="submit" className="btn-yellow">
                        <div className="text-center text-gray-900 text-lg font-medium">Verify</div>
                    </button>

                    <div className="flex justify-between">
                        {/* Bottom Sign Up Link */}
                        <Link to={"/recovery-password"} className="flex justify-center px-10 items-center">
                            <FontAwesomeIcon icon={faAngleLeft} className="mr-1" color="#9f9fa9" />
                            <div className="text-zinc-400 text-lg mr-3.5">Back to</div>
                        </Link>
                        <button type="submit" className="text-zinc-400 text-lg mr-8
                         hover:cursor-pointer">Re-send OTP</button>
                    </div>

                    <OtpCountdown initialSeconds={timeLeft} onExpire={handleOtpIsExpired} />
                </div>
            </form>

        </div>
    )
}