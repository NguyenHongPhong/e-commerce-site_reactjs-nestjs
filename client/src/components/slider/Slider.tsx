import ArrowSide from "../arrowSide/ArrowSide";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Dot from "../dot/Dot";
import { DEFAULT_URL_BANNER } from '../../constants/app.constant';
import { useEffect, useState } from "react";
function Slider() {
    const banners = ['banner-1.jpg', 'banner-2.jpg', 'banner-3.jpg', 'banner-4.jpg', 'banner-5.jpg', 'banner-6.jpg'];
    let index = 0;

    setInterval(() => {
        const slider = document.getElementById('banner');
        if (slider) {
            index++;
            if (index === banners.length) {
                index = 0;
            }

            slider.style.backgroundImage = `url(${DEFAULT_URL_BANNER}${banners[index]})`;
        }
    }, 3000);

    return (<div className="@container">
        <div className="flex justify-between">
            <div id="banner" className={`w-[70%] h-80 rounded-lg relative`} style={{
                backgroundImage: `url(${DEFAULT_URL_BANNER}${banners[0]})`, backgroundPosition: "center"
                , backgroundSize: "cover"
            }}>
                <ArrowSide side={"left-0"} arrowSide={faArrowLeft} />
                <ArrowSide side={"right-0"} arrowSide={faArrowRight} />
                <Dot quantity={6} index={0} />
            </div>
            <div className={`bg-[url(${DEFAULT_URL_BANNER}flash-sale-right-banner.gif)] w-[28%] h-80
                            bg-cover bg-center rounded-lg`}>
            </div>
        </div>
    </div>);
}

export default Slider;