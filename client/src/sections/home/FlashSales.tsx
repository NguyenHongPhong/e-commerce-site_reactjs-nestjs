import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faAngleRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import Countdown from "@components/countdown/Countdown";
import { Link } from "react-router";

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
                <div className="flex justify-between mt-7">
                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(../../../public/ui/images/shirt.png)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >

                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(https://res.cloudinary.com/dd3bsow8r/image/upload/v1756809419/category_imgs/86c294aae72ca1db5f541790f7796260%40resize_w640_nl.webp)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >

                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(https://res.cloudinary.com/dd3bsow8r/image/upload/v1756800605/category_imgs/handbag-vs-purse-difference-between-a-purse-and-a-handbag-450150_1200x600_crop_center.webp)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >

                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(https://res.cloudinary.com/dd3bsow8r/image/upload/v1756800718/category_imgs/download%20%281%29.jpg)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >

                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(https://res.cloudinary.com/dd3bsow8r/image/upload/v1756800870/category_imgs/1-blog.png)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >

                    <Link to={""} className=" h-52 w-44 hover:shadow-2xl relative group">
                        <div className="bg-[url(https://res.cloudinary.com/dd3bsow8r/image/upload/v1756801079/category_imgs/text_ng_n_1__1_96_1_1_1_1.webp)] bg-cover w-full h-3/4 absolute
                        bg-center group-hover:scale-95"></div>
                        <div className="absolute left-0 h-4 w-2/6 bg-blue-600  rounded-tr-[2px]
                                        rounded-br-[2px] top-3 -translate-x-3 after:content-[''] after:absolute after:bottom-0 after:left-0
                                        after:border-l-[3px] after:border-b-[3px]
                                        after:border-l-transparent after:border-b-transparent
                                        after:border-t-[3px] after:border-r-[3px]
                                        after:border-t-blue-600 after:border-r-blue-600
                                        after:translate-y-1 group-hover:scale-95
                                        ">
                            <span className="absolute left-1 bottom-0 translate-y-1 text-white"><FontAwesomeIcon icon={faCheck} size="2xs" /></span>
                            <span className="absolute right-2 bottom-0 text-white text-[10px]">Choice</span>
                        </div>
                        <div className="absolute right-0 top-0 bg-blue-700 w-2/5 h-5 group-hover:scale-95">
                            <div className="flex items-center ">
                                <div className="text-amber-300 -translate-y-0.5"><FontAwesomeIcon icon={faBolt} /></div>
                                <span className="text-white text-[12px] -translate-y-0.5 translate-x-1 font-semibold">-45%</span>
                            </div>
                        </div>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-6 group-hover:scale-95">3.76 USD</span>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4/5 h-4 bg-blue-100 rounded-xl group-hover:scale-95">
                            <div className="absolute left-1/2 text-[12px] -translate-x-1/2 text-cyan-800 -translate-y-0.5">Selling well</div>
                            <div className="h-full w-1/4 bg-gradient-to-r from-blue-700 to-blue-200 rounded-xl "></div>
                        </div>
                    </Link >
                </div>
            </div>
        </div>
    );
}