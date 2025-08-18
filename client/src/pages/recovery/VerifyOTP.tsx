
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useCallback, BaseSyntheticEvent } from "react";
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
import { verifyOTP, resendOtp } from "../../api/otp";
import OtpCountdown from "../../components/OtpCountdown/OtpCountdown";



export default function () {
    const [otpInput, setOtpInput] = useState<string>("");
    const dispatch = useAppDispatch();
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const navigate = useNavigate();
    const [disableBtnVerify, setDisableBtnVerify] = useState<boolean>();
    const [timeCountdown, setTimeCountdown] = useState<boolean>(false);
    const [disableResendOtp, setDisableResendOtp] = useState<boolean>(false);
    const offsetRef = useRef(0);
    const [flowId, setFlowId] = useState<string>();

    const handleOtpIsExpired = async () => {

    }

    const handleExpire = useCallback(() => {
        setTimeCountdown(true);
        setDisableBtnVerify(true);
        setDisableResendOtp(false);

    }, []);

    const handleNonExpire = useCallback(() => {
        setTimeCountdown(false);
        setDisableBtnVerify(false);
        setDisableResendOtp(true);
    }, []);


    const handleReSendOTP = () => {

        setDisableBtnVerify(false);
        setTimeCountdown(false);
        setDisableResendOtp(true);

    };

    useEffect(() => {
        const raw = sessionStorage.getItem('otpFlow');
        if (raw) {
            const { flowId, expiresAt, serverNow } = JSON.parse(raw);
            const expiresAtMs = new Date(expiresAt).getTime();
            const serverNowMs = new Date(serverNow).getTime();
            const clientNowMs = Date.now();
            offsetRef.current = clientNowMs - serverNowMs;

            const leftMs = expiresAtMs - (Date.now() - offsetRef.current);
            const initialSeconds = Math.max(0, Math.floor(leftMs / 1000));
            setTimeLeft(initialSeconds);
            setFlowId(flowId);
        }

    }, [])




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IOtpInput>();

    const onSubmit = async (data: IOtpInput, e?: BaseSyntheticEvent) => {
        if (!data.otp) return;

        const submitter = (e?.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | undefined;
        const intent = submitter?.value;

        const otpCode: IOtp = {
            otp: data.otp as string,
        }

        try {
            dispatch(enableLoading());
            if (intent === "resend") {
                //khi re-send OTP đang bắt lỗi trường email
                return resendOtp(flowId!);
            };

            const res = await verifyOTP(flowId!, otpCode.otp);
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
                    <button type="submit" name="intent" className={`btn-yellow`} disabled={disableBtnVerify && disableBtnVerify}
                        style={disableBtnVerify ? { opacity: 0.6, cursor: "default" } : {}}
                        value="verify"
                    >
                        <div className={`text-center text-gray-900 text-lg font-medium`}>Verify</div>
                    </button>

                    <div className="flex justify-between">
                        {/* Bottom Sign Up Link */}
                        <Link to={"/recovery-password"} className="flex justify-center px-10 items-center">
                            <FontAwesomeIcon icon={faAngleLeft} className="mr-1" color="#9f9fa9" />
                            <div className="text-zinc-400 text-lg mr-3.5">Back to</div>
                        </Link>
                        <button
                            type="submit"
                            name="intent"
                            value="resend"
                            className={`text-zinc-400 text-lg mr-8 relative group
                                ${disableResendOtp ? 'cursor-not-allowed ' :
                                    'hover:cursor-pointer '}`}
                            disabled={disableResendOtp}
                        >
                            Re-send OTP
                            <div className={`w-0 h-0 border-r-[10px] border-l-[10px] 
                            border-b-[15px] border-r-transparent border-l-transparent
                            border-b-zinc-500 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2.5 opacity-0
                            pointer-events-none transition-opacity duration-500 ease-in-out
                             ${disableResendOtp ? `group-hover:opacity-100` : ``}
                            `}>
                            </div>
                            <div className={`bg-zinc-500 rounded-2xl absolute bottom-0 w-[280px] 
                                             h-fit left-1/2 -translate-x-1/2 translate-y-[65px] opacity-0
                                             pointer-events-none transition-opacity duration-500 ease-in-out
                                              ${disableResendOtp ? `group-hover:opacity-100` : ``}
                                             `}>
                                <div className="text-zinc-300">
                                    Until this OTP has expired, you can't re-send OTP any more
                                </div>
                            </div>
                        </button>
                    </div>

                    <OtpCountdown onNonExpire={handleNonExpire} initialSeconds={timeLeft} onExpire={handleExpire} otpVerify={timeCountdown} reSendOtp={setDisableResendOtp} />
                </div>
            </form>

        </div>
    )
}