import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
function PromoSearchBar() {
    return (
        <div className="@container">
            <div className="flex items-center justify-between">
                <div className="bg-[url(/public/ui/images/flash-sale.gif)] h-52 w-3/12 bg-cover bg-center"></div>
                <div className="w-2/5 flex items-center border-2 border-b-black rounded-2xl h-fit p-2">
                    <input className="w-full h-10 p-4 focus:outline-0" type="text" name="searching-bar" placeholder="Enter product name..." />
                    <div className="w-20 h-10 bg-[var(--primary)] rounded-md flex justify-center items-center hover:opacity-90 hover:cursor-pointer">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="#fff" />
                    </div>
                </div>
                <div className="w-3/12 hover:cursor-pointer group">
                    <FontAwesomeIcon className="ml-[50%] -translate-x-1/2 group-hover:text-green-400" icon={faCartShopping} size="3x" color="var(--primary)" />
                </div>
            </div>
        </div>
    )
}

export default PromoSearchBar;