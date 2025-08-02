import ArrowSide from "../arrowSide/ArrowSide";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Dot from "../dot/Dot";
import { DEFAULT_URL_BANNER } from '../../constants/app.constant';
import { useEffect, useState } from "react";
function Slider() {
    const banners = ['banner-1.jpg', 'banner-2.jpg', 'banner-3.jpg', 'banner-4.jpg', 'banner-5.jpg', 'banner-6.jpg'];
    const [banner, setBanner] = useState('');
    const [indexBanner, setIndexBanner] = useState(Number);

    const handleRightSideSlider = () => {
        setIndexBanner((preIndexSlider) => {
            if (preIndexSlider === banners.length - 1) {
                return 0
            } else {
                return preIndexSlider + 1;
            }
        }
        );
    };

    const handleLeftSideSlider = () => {
        setIndexBanner((preIndexSlider) => {
            if (preIndexSlider === 0) {
                const rs = banners.length - 1;
                return rs;
            } else {
                return preIndexSlider - 1;
            }
        }
        );
    }

    useEffect(() => {
        setBanner(banners[0]);
    }, [])


    useEffect(() => {
        if (indexBanner >= 0) {
            setBanner(banners[indexBanner])
        }
        const idTimerBanner = setTimeout(() => {
            if (indexBanner === banners.length - 1) {
                setIndexBanner(0);
            } else {
                setIndexBanner(preBanner => preBanner + 1);
            }
        }, 3000)
        return () => {
            clearTimeout(idTimerBanner);

        };
    }, [indexBanner])




    return (<div className="@container">
        <div className="flex justify-between">
            <div className="w-[70%] h-80 rounded-lg ">
                <div id="banner" className={`w-full h-full rounded-lg relative transition-opacity duration-500 ease-in-out opacity-100`} style={{
                    backgroundImage: `url(${DEFAULT_URL_BANNER}${banner})`, backgroundPosition: "center"
                    , backgroundSize: "cover"
                }}>
                    <ArrowSide side={"left-0"} arrowSide={faArrowLeft} onClick={handleLeftSideSlider} />
                    <ArrowSide side={"right-0"} arrowSide={faArrowRight} onClick={handleRightSideSlider} />
                    <Dot quantity={banners.length} indexSlider={indexBanner} />
                </div>
            </div>
            <div className={` w-[29%] h-80
                            bg-cover bg-center rounded-lg`}
                style={{ backgroundImage: `url(${DEFAULT_URL_BANNER + `flash-sale-right-banner.gif`})` }}
            >
            </div>
        </div>
    </div>);
}

export default Slider;