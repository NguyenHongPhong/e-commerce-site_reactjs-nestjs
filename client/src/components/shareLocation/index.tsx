import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { ILocation } from "@uiTypes/ui";
export default function ShareLocationButton({ value, onChange }: { value: ILocation; onChange: (val: ILocation) => void }) {
    const handleClick = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                onChange({ ...value, latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            (error) => {
                if (error.code === 1) {
                    onChange({ ...value, latitude: 0, longitude: 0 });
                    alert("You have to share your location for ensuring credibility");
                } else {
                    console.log("Error getting location: " + error.message);
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div>
            <button
                type="button"
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
        </div>
    );
}
