
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { disableLoading, enableLoading } from "../../reducers/loading";
import { notify } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { IFormEmail } from "../../types/ui";
import { AxiosError } from 'axios';
import { IEmail } from "../../types/dto/login-user.dto";
import { useNavigate } from "react-router-dom";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { sendOTP } from "../../api/otp";


export default function () {
    const [emailInput, setEmailInput] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormEmail>();


    const onSubmit = async (data: IFormEmail) => {
        const recoveryEmail: IEmail = {
            email: data.email as string,
        }

        try {
            dispatch(enableLoading());
            const res = await sendOTP(recoveryEmail.email);
            sessionStorage.setItem('otpFlow', JSON.stringify({
                flowId: res.data.flowId,
                expiresAt: res.data.expiresAt,   // ISO string
                serverNow: res.data.serverNow,   // ISO string (có cũng được)
            }));
            setTimeout(() => {
                dispatch(disableLoading());
                navigate("/verify-otp");
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
            <img className="h-2/5 w-2/5"
                src="../../../public/ui/images/recovery/password-reset-icon.png" alt="password-reset-icon" />
            <h3 className="font-semibold text-4xl my-5">Forgot your password ?</h3>
            <p className="text-lg">Enter your email let we'll send OTP code to recover your account</p>
            <form className="flex justify-center w-4/5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10 flex flex-col gap-3 w-full">

                    {/* Email */}
                    <div className="input-style">
                        <input

                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                            value={emailInput}
                            className="input-field"
                            type="email"
                            placeholder="Enter your email..."
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}



                    {/* Submit Button */}
                    <button type="submit" className="btn-yellow">
                        <div className="text-center text-gray-900 text-lg font-medium">Send OTP</div>
                    </button>


                    {/* Bottom Sign Up Link */}
                    <Link to={"/login"} className="flex justify-center px-10 items-center">
                        <FontAwesomeIcon icon={faAngleLeft} className="mr-1" color="#9f9fa9" />
                        <div className="text-zinc-400 text-lg mr-3.5">Back to Login</div>
                    </Link>
                </div>
            </form>

        </div>
    )
}