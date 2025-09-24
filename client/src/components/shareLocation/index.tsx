import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
export default function ShareLocationButton() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "denied" | "error" | "success">("idle");

    const handleClick = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setStatus("loading");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setStatus("success");
            },
            (error) => {
                if (error.code === 1) {
                    // PERMISSION_DENIED
                    setStatus("denied");
                    alert("You denied location access");
                } else {
                    setStatus("error");
                    alert("Error getting location: " + error.message);
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className=" px-6 py-3
                            bg-gray-900
                            text-white font-semibold
                            rounded-lg
                            hover:bg-gray-800
                            transition-all duration-300
                            hover:cursor-pointer
                            ">
                <FontAwesomeIcon icon={faLocationDot} /> Share your location
            </button>

            {status === "loading" && <p>Fetching location...</p>}
            {status === "success" && location && (
                <p>
                    Latitude: {location.lat}, Longitude: {location.lng}
                </p>
            )}
            {status === "denied" && <p className="text-red-600">Location access denied</p>}
        </div>
    );
}
