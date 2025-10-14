import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface StarRatingProps {
    rating: number; // ví dụ 4.7
    size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 18 }) => {
    const percentage = Math.min((rating / 5) * 100, 100);
    return (
        <div className="relative inline-block leading-none text-[0px]">
            {/* Lớp nền (xám nhạt) */}
            <div className="inline-flex gap-0 leading-none text-gray-300" >
                {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: size }} />
                ))}

                { }
            </div>

            {/* Lớp phủ (vàng) */}
            <div
                className="absolute top-0 left-0 overflow-hidden text-yellow-500 pointer-events-none leading-none text-[0px]"
                style={{ width: `${percentage}%` }}
            >
                <div className="inline-flex gap-0 leading-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} style={{ fontSize: size }} />
                    ))}
                </div>
            </div>
        </div>

    );
};
