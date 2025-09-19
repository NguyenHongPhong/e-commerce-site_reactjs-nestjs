import { Outlet } from "react-router"
export default function () {
    return (
        <div className="@container">
            <div className="h-[48vw] w-full flex justify-center items-center p-10">
                <Outlet />
            </div>
        </div>
    )
}