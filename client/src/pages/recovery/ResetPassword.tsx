import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEye, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "../../hooks";
import { disableLoading, enableLoading } from "../../reducers/loading";
import { notify } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
import { IFormResetPassword } from "../../types/ui";
import { resetPassword } from "../../api/user";
import { IUserResetPassword } from "../../types/dto/user.dto";



export default function () {
    const [email, setEmail] = useState<string>();
    useEffect(() => {
        const emailVerified = sessionStorage.getItem("gmail-verified");
        setEmail(emailVerified!);
    }, [])
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormResetPassword>();
    const dispatch = useAppDispatch();


    const onSubmit = async (data: IFormResetPassword) => {
        const newPassword: IUserResetPassword = {
            newPassword: data.password,
            email: email!
        };

        try {
            dispatch(enableLoading());
            const res = await resetPassword(newPassword);
            sessionStorage.removeItem("gmail-verified");

            setTimeout(async () => {
                dispatch(disableLoading());
                notify(res.data.message, "success");
            }, 2000);

            setTimeout(async () => {
                navigate("/login");
            }, 4000);
        } catch (err) {
            const error = err as AxiosError;
            const message = (error.response?.data as any)?.message;
            console.error("Error resend otp:", message);
            dispatch(disableLoading());
            notify(message, "error");
        }



    };
    return (
        <div className="flex justify-center flex-col items-center mb-20 w-1/2">
            <img className="h-1/4 w-2/6"
                src="../../../public/ui/images/recovery/reset-password.jpg" alt="password-reset-icon" />
            <h3 className="font-semibold text-4xl my-5">Change Password</h3>
            <p className="text-lg text-center">Please, enter your new password and this is use for safe security.

                <strong className="font-semibold"> Do not
                    share to any one else.</strong>
            </p>

            <form className="flex justify-center w-4/5" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10 flex flex-col gap-3 w-full">
                    {/* Password */}
                    <div className="input-style">
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                                // optional: trim spaces
                                setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                            })}
                            className="input-field"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password..."
                        />
                        <FontAwesomeIcon
                            className="hover:cursor-pointer hover:opacity-50"
                            icon={faEye}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    {/* Confirm Password */}
                    <div className="input-style">
                        <input
                            {...register("confirm_password", {
                                required: "Please confirm your password",
                                minLength: { value: 6, message: "Minimum 6 characters" }, // optional but nice UX
                                validate: (val) => val === watch("password") || "Passwords do not match",
                                setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                            })}
                            className="input-field"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password..."
                        />
                        <FontAwesomeIcon
                            className="hover:cursor-pointer hover:opacity-50"
                            icon={faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>
                    {errors.confirm_password && (
                        <p className="text-red-500">{errors.confirm_password.message}</p>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="btn-yellow">
                        <div className="text-center text-gray-900 text-lg font-medium">Confirm change</div>
                    </button>
                </div>
            </form>


        </div>
    )
}