import type { ISideDirection } from "../../types/ui/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ArrowSide(props: ISideDirection) {
    const { side, arrowSide, onClick } = props;
    return (
        <div className={`${side} top-1/2 -translate-y-1/2 absolute`}>
            <div className="flex items-center justify-center h-12 w-7 bg-[rgba(0,0,0,0.7)]" onClick={onClick}>
                <FontAwesomeIcon icon={arrowSide} color="#fff" />
            </div>
        </div>
    );
}

export default ArrowSide