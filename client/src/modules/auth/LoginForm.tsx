
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "../../hooks";
import { disableLoading, enableLoading } from "../../reducers/loading";
import { notify } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { FormValues } from "../../types/ui";
import { AxiosError } from 'axios';
import { ILoginUserDto } from "../../types/dto/login-user.dto";
import { login } from "../../api/auth";
import { getProfile } from "../../api/user";


export default function () {
    const [emailInput, setEmailInput] = useState<string>("");
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberMe");
        if (rememberedEmail) {
            setEmailInput(rememberedEmail);
            setIsCheck(true);
        };
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            localStorage.setItem('rememberMe', emailInput);
            setIsCheck(true);
        } else {
            localStorage.removeItem('rememberMe');
            setIsCheck(false);
        }
    };


    const onSubmit = async (data: FormValues) => {
        const userLogin: ILoginUserDto = {
            password: data.password as string,
            email: data.email as string,
        }

        try {
            dispatch(enableLoading());
            const res = await login(userLogin);
            setTimeout(async () => {
                dispatch(disableLoading());
                notify(res.data.message, "success");
                await getProfile();
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
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 flex flex-col gap-3 w-[70%]">

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

                {/* Password */}
                <div className="input-style">
                    <input
                        {...register("password", { required: "Password is required" })}
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

                {/* Remember Me */}
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <input {...register("remember_me")} className="mr-3" type="checkbox"
                            onChange={(e) => handleRememberMe(e)} checked={isCheck}
                        />
                        <p>Remember me</p>
                    </div>
                    <Link to={`/recovery-password`} className="justify-start text-sky-600 text-base font-medium leading-snug">
                        Recovery Password
                    </Link>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-yellow">
                    <div className="text-center text-gray-900 text-lg font-medium">Log In</div>
                </button>

                {/* Sign in with Gmail */}
                <a href={""} className="w-full p-3 rounded-[10px] outline-1 outline-offset-[-1px] outline-zinc-300
                 inline-flex flex-col justify-center items-center gap-2.5 hover:cursor-pointer">
                    <div className="inline-flex justify-start items-center gap-2.5">
                        <div className="w-6 h-6 relative overflow-hidden">
                            <img src="/public/icons/google-icon.png" className="w-6 h-6" alt="google-icon" />
                        </div>
                        <div className="text-gray-900 text-lg font-medium">Sign in with Gmail</div>
                    </div>
                </a>

                {/* Bottom Sign Up Link */}
                <Link to={"/register"} className="flex justify-center px-10 ">
                    <div className="text-zinc-400 text-lg mr-3.5">You have an account yet?</div>
                    <div className="text-sky-600 text-lg font-medium hover:cursor-pointer hover:opacity-50">Sign Up</div>
                </Link>
            </div>
        </form>
    )
}