import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEye, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IUserDto } from "../../types/dto/user.dto";
import { createUser } from "../../api/user";
import { useAppDispatch } from "../../hooks";
import { disableLoading, enableLoading } from "../../reducers/loading";
import { notify } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { FormValues } from "../../types/ui";
import { AxiosError } from 'axios';
import { Link, useSearchParams } from "react-router";
import { loginByEmail } from "../../api/auth";
import { useLocation } from 'react-router-dom';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const scope = import.meta.env.VITE_GOOGLE_SCOPE;
const authUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;


export default function () {
    const location = useLocation();
    const [params] = useSearchParams(location.search);
    useEffect(() => {
        const accessToken = params.get('accessToken');
        const message = params.get('message');
        const err = params.get('error');


        if (err) {
            notify(err, "error");
        }
        if (accessToken && message) {
            notify(message, "success");
        }

        return window.history.replaceState({}, document.title, window.location.pathname);
    }, [location.search])

    // Inside your component, before the return statement
    const googleAuthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code`;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: FormValues) => {
        const newUser: IUserDto = {
            first_name: data.first_name as string,
            last_name: data.last_name as string,
            username: data.username as string,
            password: data.password as string,
            email: data.email as string,
            phone_number: data.phone_number as string
        }


        try {
            dispatch(enableLoading());
            await createUser(newUser);
            reset();
            setTimeout(() => {
                dispatch(disableLoading());
                notify("Registration successful!", "success");
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

                {/* First Name */}
                <div className="input-style">
                    <input
                        {...register("first_name", { required: "First name is required" })}
                        className="input-field"
                        type="text"
                        placeholder="Enter first name..."
                    />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

                {/* Last Name */}
                <div className="input-style">
                    <input
                        {...register("last_name", { required: "Last name is required" })}
                        className="input-field"
                        type="text"
                        placeholder="Enter last name..."
                    />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

                {/* Username */}
                <div className="input-style">
                    <input
                        {...register("username", { required: "Username is required" })}
                        className="input-field"
                        type="text"
                        placeholder="Enter user name..."
                    />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

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

                {/* Confirm Password */}
                <div className="input-style">
                    <input
                        {...register("confirm_password", {
                            required: "Please confirm your password",
                            validate: (val) => val === watch("password") || "Passwords do not match",
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
                        className="input-field"
                        type="email"
                        placeholder="Enter your email..."
                    />
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                {/* Phone */}
                <div className="input-style">
                    <input
                        {...register("phone_number", {
                            required: "Phone number is required",
                            minLength: { value: 10, message: "Phone must be 10 digits" },
                            maxLength: { value: 10, message: "Phone must be 10 digits" },
                            pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
                        })}
                        className="input-field"
                        type="text"
                        placeholder="Enter your phone number..."
                    />
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}

                {/* Remember Me */}
                {/* <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <input {...register("remember_me")} className="mr-3" type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <div className="justify-start text-sky-600 text-base font-medium leading-snug">
                        Recovery Password
                    </div>
                </div> */}

                {/* Submit Button */}
                <button type="submit" className="btn-yellow">
                    <div className="text-center text-gray-900 text-lg font-medium">Sign Up</div>
                </button>

                {/* Sign in with Gmail */}
                <a href={googleAuthUrl} className="w-full p-3 rounded-[10px] outline-1 outline-offset-[-1px] outline-zinc-300
                 inline-flex flex-col justify-center items-center gap-2.5 hover:cursor-pointer">
                    <div className="inline-flex justify-start items-center gap-2.5">
                        <div className="w-6 h-6 relative overflow-hidden">
                            <img src="/public/icons/google-icon.png" className="w-6 h-6" alt="google-icon" />
                        </div>
                        <div className="text-gray-900 text-lg font-medium">Sign up with Gmail</div>
                    </div>
                </a>

                {/* Bottom Sign In Link */}
                <Link to={"/login"} className="flex justify-center px-10 ">
                    {/* <Link to={"/login"} className="text-zinc-400 text-lg">You have an account yet?</Link> */}
                    <div className="text-sky-600 text-lg font-medium hover:cursor-pointer hover:opacity-50">Sign In</div>
                </Link>
            </div>
        </form>
    );
}