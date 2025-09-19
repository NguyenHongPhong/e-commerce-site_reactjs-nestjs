import { Outlet, Link } from "react-router";
import LeftSection from "../components/auth";
export default function () {
    return (
        <div className="@container h-[100vh]">
            <div className="flex p-5">
                <div className="w-1/2 flex items-center">
                    <LeftSection />
                </div>
                <div className="w-1/2">
                    <Link to="/" className="flex justify-center">
                        <div className="flex items-center">
                            <img className="w-8 h-8 mr-2.5" src="../../../public/logo/icon.svg" alt="Logo" />
                            <div className="w-36 h-8 text-gray-900 text-xl font-bold font-['Gordita'] leading-loose">E-commerce</div>
                        </div>
                    </Link>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}