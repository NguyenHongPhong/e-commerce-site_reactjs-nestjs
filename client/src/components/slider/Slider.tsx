import ArrowSide from "../arrowSide/ArrowSide";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Dot from "../dot/Dot";
function Slider() {
    return (<div className="@container">
        <div className="flex justify-between">
            <div className="bg-[url(/ui/images/silder-banner/flash-sale-offer-poster-template-design-cc9243debab3901f2a0e33b1daef7304_screen.jpg)] w-[70%] h-80
                            bg-cover bg-center rounded-lg relative">
                <ArrowSide side={"left-0"} arrowSide={faArrowLeft} />
                <ArrowSide side={"right-0"} arrowSide={faArrowRight} />
                <Dot quantity={6} index={0} />
            </div>
            <div className="bg-[url(/ui/images/silder-banner/flash-sale-offer-poster-template-design-cc9243debab3901f2a0e33b1daef7304_screen.jpg)] w-[28%] h-80
                            bg-cover bg-center rounded-lg">
            </div>
        </div>
    </div>);
}

export default Slider;