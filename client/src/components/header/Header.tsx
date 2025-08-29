import { Link } from "react-router";
import { getProfile } from "../../api/user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authenticated, unauthenticated } from "../../reducers/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { useSessionExpiryCountdown } from "../../features/auth/hooks/useSessionExpiryCountdown";
import { refreshToken } from "../../api/auth";
import { IProfileUserDto } from "../../types/dto/user.dto";
import { useIdle } from "../../features/ui/hooks/useIdle";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { ErrorResponse } from "../../types/ui";

function Header() {
    const { secondsLeft, isExpired, timeUp } = useSessionExpiryCountdown("time-ending");
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);
    const status = useAppSelector((s) => s.auth.status);
    const [profile, setProfile] = useState<IProfileUserDto>();
    const navigate = useNavigate();
    const [idle, setIdle] = useState(0);
    const isIdle = useIdle(idle);
    const [showPrompt, setShowPrompt] = useState(false);
    
    //call api to get profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                const user = res.data;
                setProfile(user);

            } catch (err) {
                dispatch(unauthenticated());
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    //assign data to store redux then could access in multiple pages
    useEffect(() => {
        if (profile) {
            dispatch(authenticated({ user: profile }));
        };
    }, [profile]);

    //Caculating expire time to check if user is inactive
    useEffect(()=> {
        const expiresIn = sessionStorage.getItem("time-ending");
        if(expiresIn) {
                const convertData = JSON.parse(expiresIn);
                const rs = ((convertData.expiresIn ?? 0) * 1000)-5000;
                setIdle(rs);
        }
                    
    }, []);

    //Call API when accessToken expired
    useEffect(() => {
        if (!isExpired) return;
        if (timeUp && !isIdle) {
            setTimeout(() => {
                const fetchProfileAsTokenExpired = async () => {
                    try {
                        const res = await getProfile();
                    } catch (e: any) {
                        const err = e as AxiosError;
                        const status = err?.response?.status;

                        if (status !== 401) {
                            return;
                        }
                    }

                    try {
                        const result = await refreshToken();
                        const newTimer = { expiresIn: result.data.expiresIn, serverNow: result.data.serverNow };
                        sessionStorage.setItem("time-ending", JSON.stringify(
                            newTimer
                        ));

                        window.dispatchEvent(new CustomEvent("token:updated", { detail: newTimer }));

                        const res = await getProfile();
                        const user = res.data;
                        setProfile(user);
                    } catch (e) {
                        const err = e as AxiosError<ErrorResponse>;
                        const status = err?.response?.status;
                        // Treat 401/403/410 as “must re-login”
                        if (status === 401 || status === 403 || status === 410) {
                            sessionStorage.removeItem("time-ending");
                            console.log(err);
                            setTimeout(() => {
                                navigate("/login");
                            }, 5000);
                            return;
                        }
                    }
                };
                fetchProfileAsTokenExpired();
            }, 2000);
        }
    }, [isExpired, isIdle]);
    
    useEffect(()=> {
        if(isIdle) {
           console.log("User is inactive");
        }
    }, [isIdle])



    return (<header>
        <div className="@container">
            <div className="flex justify-between">
                <Link to="/" className="grow flex items-center">
                    <div className="flex items-center">
                        <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                        <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                    </div>
                </Link>
                <nav className={`text-lg grow flex justify-between items-center ${status === "authenticated" ? `ml-32 ` : ``}`}>
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                {status === "guest" && (<div className="flex items-center grow justify-end">
                    <Link to="/login" className="mr-5 text-gray-900 text-base font-semibold font-['Plus_Jakarta_Sans'] 
                    leading-7">Log in</Link>
                    <Link to="/register" className="w-28 h-12 bg-gray-900 rounded-md flex justify-center items-center
                     hover:opacity-85">
                        <span className="text-white">Sign up</span>
                    </Link>
                </div>)}

                {status === "authenticated" && (<div className="grow-2"></div>)}

                {profile && status === "authenticated" && (
                    <div className=" relative group hover:cursor-pointer after:content-['']
                    after:w-full after:h-6 after:absolute">
                        <div className="items-center justify-end flex">
                            <img className="w-10 h-10 rounded-full mr-2" src={profile.portrait!} alt="" />
                            <span className="font-semibold">{profile.username}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className="w-0 h-0 border-l-transparent border-r-transparent
                        border-b-[#e5e5e5] border-l-[12px] border-r-[12px] border-b-[15px]
                        absolute bottom-0 right-20 translate-y-2 opacity-0 pointer-events-none
                        transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto
                        "></div>

                        <div className="absolute bottom-0 right-0 opacity-0 pointer-events-none
                                        transition-opacity duration-300 ease-out group-hover:opacity-100 
                                        group-hover:pointer-events-auto">
                            <ul className="z-10 relative text-base translate-y-40 bg-[#e5e5e5] rounded-2xl
                                            p-4 gap-2.5 flex flex-col">
                                <li className="hover:underline">Personal information</li>
                                <li className="hover:underline">Historical</li>
                                <li className="hover:underline">Setting</li>
                                <li className="hover:underline">Log out</li>
                            </ul>
                        </div>
                    </div>)}
            </div>
        </div>
    </header>)
}

export default Header;