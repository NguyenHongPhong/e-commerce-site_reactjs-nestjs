import { Outlet } from "react-router"
import { useAppSelector } from "../hooks"
import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';

export default function () {
    const isLoading = useAppSelector((state) => state.loading.value);
    return (
        <LoadingOverlay
            active={isLoading}
            spinner={<BounceLoader color="#36d7b7" />}
            text="Loading..."
        >
            <div className="@container">
                <div className="h-[48vw] w-full flex justify-center items-center p-10">
                    <Outlet />
                </div>
            </div>
        </LoadingOverlay>
    )
}