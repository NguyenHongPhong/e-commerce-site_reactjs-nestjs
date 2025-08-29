import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Countdown from "@components/countdown/Countdown";
export default () => {
    return (
        <div className="@container">
            <div>
                <div className="flex justify-between">
                    <div className="flex">
                        <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500) mr-4">F{<FontAwesomeIcon icon={faBolt} size="1x" />}ASH SALE</h2>
                        <Countdown hours={2} minutes={30} seconds={45} />
                    </div>
                    <button className="text-(--color-primary-500) hover:cursor-pointer">View all
                        <span><FontAwesomeIcon icon={faAngleRight} /></span>
                    </button>
                </div>
                <div></div>
            </div>
        </div>
    );
}