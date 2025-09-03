import { Link } from "react-router";
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
                    <Link key={i} to={""} className="h-96 w-56 hover:shadow-2xl relative group hover:border-blue-600 hover:border-2 border-gray-400 border-[1px]">
                        <div className="bg-[url(../../../public/ui/images/shirt.png)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>

                        <div className="flex justify-between items-center ư absolute bottom-11 px-1.5 w-full">
                            <div className="h-5 w-2/5 bg-blue-700 text-[12px] text-white rounded-sm text-center mr-2">Favorite</div>
                            <FontAwesomeIcon icon={faHeart} color="red" />
                        </div>
                        <div className=" absolute bottom-1 px-1.5 ">
                            <span className="text-[12px] line-clamp-2">T-shirts for mens. It could be easy to mix with other outfit. Then</span>
                        </div>

                        <div className="absolute -bottom-3 px-1.5 ">
                            <span className="text-[12px] line-clamp-2 text-blue-700 font-semibold">$4.20 USD</span>
                        </div>
                    </Link >
                ))}
            </div>
        </div>
    </div>)
}

export default Recommendation;