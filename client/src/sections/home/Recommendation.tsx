import { Link } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Recommendation = () => {
    return (<div className="@container">
        <div>
            <div className="text-center">
                <h3 className="font-medium">RECOMMENDATION TODAY</h3>
            </div>
            <div className="h-1 w-full bg-blue-600 my-2.5"></div>
            <div className="grid grid-cols-5 mt-7 gap-5">
                {[...Array(30)].map((_, i) => (
                    <Link key={i} to={""} className="h-52 w-44 hover:shadow-2xl relative group hover:border-blue-600">
                        <div className="bg-[url(../../../public/ui/images/shirt.png)] bg-cover w-full h-3/5 absolute
                        bg-center group-hover:scale-95"></div>

                        <div className="flex justify-between items-center absolute bottom-11 px-1.5 w-full">
                            <div className="h-5 w-2/5 bg-blue-700 text-[12px] text-white rounded-sm text-center mr-2 group-hover:scale-95">Favorite</div>
                            <FontAwesomeIcon icon={faHeart} color="red" className="group-hover:scale-95" />
                        </div>

                        <div className="absolute bottom-1 px-1.5">
                            <span className="text-[12px] line-clamp-2 group-hover:scale-95">T-shirts for mens. It could be easy to mix with other outfit. Then</span>
                        </div>

                    </Link >
                ))}
            </div>
        </div>
    </div>)
}

export default Recommendation;