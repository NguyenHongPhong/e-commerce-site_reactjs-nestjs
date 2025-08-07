import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEye, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
export default function () {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handlerConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <form className="flex justify-center" action={`${apiUrl}/users`} method="POST">
            <div className="mt-10 flex flex-col gap-7 w-[70%]">
                <input className="hidden" type="text" name="status_id" value={"0"} />
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input className="outline-0 w-full pr-5" type="text" name="first_name" placeholder="Enter first name..."
                        required />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input className="outline-0 w-full pr-5" type="text" name="last_name" placeholder="Enter last name..."
                        required />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input className="outline-0 w-full pr-5" type="text" name="username" placeholder="Enter user name..."
                        required />
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input id="password" className="outline-0 w-full pr-5" type={showPassword ? "text" : "password"}
                        name="password" placeholder="Enter password..." required />
                    <FontAwesomeIcon className="hover:cursor-pointer hover:opacity-50" icon={faEye}
                        onClick={() => handlerShowPassword()} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input id="confirm-password" className="outline-0 w-full pr-5"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password..." required />
                    <FontAwesomeIcon className="hover:cursor-pointer hover:opacity-50" icon={faEye}
                        onClick={() => handlerConfirmPassword()} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input className="outline-0 w-full pr-5" type="email" name="email" placeholder="Enter your email..."
                        required />
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className=" flex justify-between w-full items-center rounded-[10px] p-3 outline-1 
                            outline-offset-[-1px] outline-zinc-300">
                    <input className="outline-0 w-full pr-5" type="text" name="phone_number"
                        placeholder="Enter your phone number..." required />
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <input className="mr-3" type="checkbox" name="remember-me" />
                        <p className="mb-1">Remember me</p>
                    </div>
                    <div className="justify-start text-sky-600 text-base font-medium font-['Gordita'] leading-snug">
                        Recovery Password</div>
                </div>

                <button type="submit" className="w-full p-3 bg-yellow-500 rounded-[10px] inline-flex justify-center 
                items-start gap-2.5 hover:opacity-90 hover:cursor-pointer">
                    <div className="text-center  text-gray-900 text-lg font-medium font-['Gordita'] leading-relaxed">Sign Up</div>
                </button>

                <div className="w-full  p-3 rounded-[10px]  outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex
                 flex-col justify-center items-center gap-2.5">
                    <div className="inline-flex justify-start items-center gap-2.5">
                        <div className="w-6 h-6 relative overflow-hidden">
                            <img src="/public/icons/google-icon.png" className="w-6 h-6" alt="google-icon" />
                        </div>
                        <div className="justify-start text-gray-900 text-lg font-medium font-['Gordita'] leading-relaxed">
                            Sign in with Gmail</div>
                    </div>
                </div>

                <div className="flex justify-between px-10">
                    <div className="text-zinc-400 text-lg font-normal font-['Gordita'] leading-relaxed">You have an account
                        yet?</div>
                    <div className=" text-sky-600 text-lg font-medium font-['Gordita'] leading-relaxed">Sign In</div>
                </div>
            </div>
        </form>)
}