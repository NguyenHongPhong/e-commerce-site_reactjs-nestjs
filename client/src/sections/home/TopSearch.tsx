import { Link } from "react-router-dom";
import { faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllProductMutation } from "@modules/product/queries";
const TopSearch = () => {
    const { data: products } = useGetAllProductMutation();

    return (<div className="@container">
        <div>
            <div className="flex justify-between">
                <div className="flex">
                    <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500) mr-4">TOP SEARCH</h2>
                </div>
                <button className="text-(--color-primary-500) hover:cursor-pointer">View all
                    <span><FontAwesomeIcon icon={faAngleRight} /></span>
                </button>
            </div>
            <div className="flex justify-between mt-7">
                {products?.map((product: any, i: number) => (
                    <Link key={i} to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className={` bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95`}
                            style={{ backgroundImage: `url(${product.product_Images?.[0]?.url})` }}
                        ></div>
                        <div className="absolute left-0 top-0 h-8 w-12 bg-gradient-to-t from-blue-600 to-blue-300
                    group-hover:scale-95 after:group-hover:scale-95
                    after:content-[''] after:absolute after:w-12 after:bottom-0 rounded-b-[4px]
                    after:border-l-transparent after:border-r-transparent after:border-l-[24px] after:border-r-[24px]
                    after:border-t-[18px]  after:border-t-blue-600 after:translate-y-4 after:rounded-t-md">
                            <div className="flex justify-center items-center h-full">
                                <span className="font-semibold text-white">TOP</span>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 group-hover:scale-95">{product.title}</div>
                        <div className="flex text-yellow-500 absolute bottom-1 left-1/2 -translate-x-1/2">
                            <FontAwesomeIcon icon={faStar} size="2xs" />
                            <FontAwesomeIcon icon={faStar} size="2xs" />
                            <FontAwesomeIcon icon={faStar} size="2xs" />
                            <FontAwesomeIcon icon={faStar} size="2xs" />
                            <FontAwesomeIcon icon={faStar} size="2xs" />
                            <span className="pointer-events-none absolute inset-0 overflow-hidden">
                                <span className="block w-12 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 rotate-12 
                                                -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                            </span>
                        </div>
                    </Link >
                ))}
            </div>
        </div >
    </div >)
}


export default TopSearch;