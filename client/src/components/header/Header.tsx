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

function Header() {
    const { secondsLeft, isExpired } = useSessionExpiryCountdown("time-ending");
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);
    const status = useAppSelector((s) => s.auth.status);
    const [profile, setProfile] = useState<IProfileUserDto>();

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

    useEffect(() => {
        if (!isExpired) return;
        console.log("Time's up");

        const fetchProfileAsTokenExpired = async () => {
            try {
                await getProfile();
            } catch (err: any) {
                console.error(err);
                if (err.response.status === 401) {
                    const result = await refreshToken();
                    console.log(result.data);
                    sessionStorage.setItem("time-ending", JSON.stringify(
                        { expiresIn: result.data.expiresIn - 1, serverNow: result.data.serverNow }
                    ));
                    //Mỗi lần refresh thời gian sẽ luôn được lắp lại vậy nên component 
                    //con sẽ nhận thời gian expire giống nhau và khi child component 
                    //nhận được tham số giống nhau nó sẽ không thể re-render lại chính nó
                    const res = await getProfile();
                    const user = res.data;
                    setProfile(user);
                }

            }
        };
        fetchProfileAsTokenExpired();
    }, [isExpired]);

    console.log(secondsLeft);

    useEffect(() => {
        if (profile) {
            dispatch(authenticated({ user: profile }));
        };
    }, [profile])


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