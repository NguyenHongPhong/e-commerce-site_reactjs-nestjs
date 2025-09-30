import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { useLogoutmutation } from "@modules/auth/queries";
import Footer from "@components/footer/Footer";
import { notify } from "@utils/toast";
import { unauthenticated } from "@reducers/auth";
export default function () {
    const user = useAppSelector((s) => s.auth.user);
    const status = useAppSelector((s) => s.auth.status);
    const dispatch = useAppDispatch();
    const { mutate: logout, data: message, isSuccess, error } = useLogoutmutation();

    const handleLogout = () => {
        dispatch(unauthenticated());
        logout();
        notify(message, "success");
    };
    return (
        <div className="@container">
            <div className="h-fit">
                <header>
                    <div className="@container">
                        <div className="flex justify-between">
                            <Link to="/" className="grow flex items-center">
                                <div className="flex items-center">
                                    <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                                    <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                                </div>
                            </Link>

                            {status === "loading" && (<div>Loading......</div>)}

                            {user && (
                                <div className="relative group hover:cursor-pointer after:content-['']
                                                after:w-full after:h-6 after:absolute">
                                    <div className="items-center justify-end flex">
                                        <img className="w-10 h-10 rounded-full mr-2" src={user?.portrait || `/public/ui/images/defaut-portrait.jfif`} alt="" />
                                        <span className="font-semibold">Hello {user.first_name}</span>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </div>
                                    <div className="w-0 h-0 border-l-transparent border-r-transparent
                                            border-b-[#f0ecec] border-l-[12px] border-r-[12px] border-b-[15px]
                                            absolute bottom-0 left-1/2 translate-y-2 opacity-0 pointer-events-none
                                            transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto"></div>

                                    <div className="absolute bottom-0 right-0 opacity-0 pointer-events-none
                                        transition-opacity duration-300 ease-out group-hover:opacity-100 
                                        group-hover:pointer-events-auto translate-y-40 w-44 z-20">
                                        <ul className="z-10 relative text-base bg-[#f0ecec] rounded-2xl
                                            p-4 gap-2.5 flex flex-col">
                                            <li className="hover:underline">Profile</li>
                                            <li className="hover:underline">Historical</li>
                                            <li className="hover:underline">Setting</li>
                                            <li className="hover:underline" onClick={handleLogout}>Log out</li>
                                        </ul>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </header>
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}