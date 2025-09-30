import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { authenticated, unauthenticated } from "@reducers/auth";
import { useLogoutmutation } from "@modules/auth/queries";
import { notify } from "@utils/toast";
function Header() {
    // const { secondsLeft, isExpired, timeUp } = useSessionExpiryCountdown("time-ending");
    const user = useAppSelector((s) => s.auth.user);
    const status = useAppSelector((s) => s.auth.status);
    const dispatch = useAppDispatch();
    const { mutate: logout, data: message, isSuccess, error } = useLogoutmutation();

    const handleLogout = () => {
        dispatch(unauthenticated());
        logout(); // gọi API logout
        notify(message, "success");
    };


    return (<header>
        <div className="@container">
            <div className="flex justify-between">
                <Link to="/" className="grow flex items-center">
                    <div className="flex items-center">
                        <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                        <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                    </div>
                </Link>
                <nav className={`text-lg grow flex justify-between items-center ${user ? `ml-32 ` : ``}`}>
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </nav>

                {status === "loading" && (<div>Loading......</div>)}

                {!user && (<div className="flex items-center grow justify-end">
                    <Link to="/login" className="mr-5 text-gray-900 text-base font-semibold font-['Plus_Jakarta_Sans'] 
                    leading-7">Log in</Link>
                    <Link to="/register" className="w-28 h-12 bg-gray-900 rounded-md flex justify-center items-center
                     hover:opacity-85">
                        <span className="text-white">Sign up</span>
                    </Link>
                </div>)}

                {user && (<div className="grow"></div>)}

                {user && (
                    <div className=" relative group hover:cursor-pointer after:content-['']
                    after:w-full after:h-6 after:absolute">
                        <div className="items-center justify-end flex">
                            <img className="w-10 h-10 rounded-full mr-2" src={user?.portrait || `/public/ui/images/defaut-portrait.jfif`} alt="" />
                            <span className="font-semibold">{user.first_name}</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className="w-0 h-0 border-l-transparent border-r-transparent
                        border-b-[#f0ecec] border-l-[12px] border-r-[12px] border-b-[15px]
                        absolute bottom-0 left-1/2 translate-y-2 opacity-0 pointer-events-none
                        transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto
                        "></div>

                        <div className="absolute bottom-0 right-0 opacity-0 pointer-events-none
                                        transition-opacity duration-300 ease-out group-hover:opacity-100 
                                        group-hover:pointer-events-auto translate-y-48 w-44 z-20">
                            <ul className="z-10 relative text-base bg-[#f0ecec] rounded-2xl
                                            p-4 gap-2.5 flex flex-col">
                                <li className="hover:underline">Profile</li>
                                <li className="hover:underline">Historical</li>
                                <li className="hover:underline"><Link to={""}>Become Shopper</Link></li>
                                <li className="hover:underline">Setting</li>
                                <li className="hover:underline" onClick={handleLogout}>Log out</li>
                            </ul>
                        </div>
                    </div>)}
            </div>
        </div>
    </header>)
}

export default Header;