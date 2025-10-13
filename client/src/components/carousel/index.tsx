import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CustomCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const reviwers = [1, 2, 4, 5, 6]
    return (
        <Carousel
            responsive={responsive}
            showDots={true}
            containerClass="px-8"
            itemClass="w-full !flex-shrink-0"  // ✅ Quan trọng
            sliderClass="w-full"
        >
            {reviwers.map((_, idx) => (
                <div
                    key={idx}
                    className="rounded-lg border-2 border-[#f7f7f7] w-11/12 px-3 py-2"
                >
                    <div className="flex flex-col gap-4">
                        {/* Portrait and name */}
                        <div className="flex gap-2 items-center">
                            <img
                                className="w-10 h-10 rounded-full mr-2"
                                src={`/public/ui/images/defaut-portrait.jfif`}
                                alt=""
                            />
                            <span className="font-medium">Alex Mathip</span>
                        </div>

                        {/* Rate + Date */}
                        <div className="flex gap-2 items-center justify-between ">
                            <span className="flex gap-2">
                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                            </span>
                            <span className="text-[#aeaeae]">13 Oct 2025</span>
                        </div>

                        {/* Comment */}
                        <p className="text-[#aeaeae]">
                            “NextGen’s dedication to sustainability and ethical practices resonates
                            strongly with today’s consumers, positioning the brand as a responsible
                            choice in the fashion world.”
                        </p>
                    </div>
                </div>
            ))}
        </Carousel>

    )
}

export default CustomCarousel;