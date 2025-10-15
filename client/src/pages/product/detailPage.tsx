import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@modules/product/queries";
import GalleryProduct from "@modules/product/component/GalleryProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPercent, faBoxOpen, faTruck, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Tabs from "@components/tabs";
import CustomCarousel from "@components/carousel";
import { ICommentUser, IResponsiveCasourel, ISimilarProduct, IFeature } from "@uiTypes/dto/product.dto";
import { StarRating } from "@components/StarRating";
function DetailPage() {
    const { id } = useParams();
    const { data: product } = useGetProductByIdQuery(id!);
    const [quantity, setQuantity] = useState(1);
    if (!product) {
        return (<p>Loading......</p>)
    }
    const review: ICommentUser[] = [{ name: "Nguyễn Văn a", content: "Sản phẩm rất tốt", rate: 5, commentedAt: "14 Otcober 2025" },
    { name: "Nguyễn Văn B", content: "Sản phẩm khá ổn so với mức giá", rate: 4, commentedAt: "16 Otcober 2025" },
    { name: "Nguyễn Văn C", content: "Sản phẩm chưa đáp ứng được yêu cầu. mức giá ổn", rate: 3, commentedAt: "18 Otcober 2025" },
    { name: "Nguyễn Văn D", content: "Sản phẩm khá tệ", rate: 2, commentedAt: "20 Otcober 2025" }
    ];

    let productsByCategory: ISimilarProduct[] = [];

    if (product.productsByCategory) {
        productsByCategory = product.productsByCategory;
    }
    const defaultResponsive: IResponsiveCasourel = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };
    product && console.log(product);
    return (
        <div className="py-10 flex flex-col gap-10">
            <div className="bg-[#f6f6f6] p-3 flex gap-5 text-[#aeadb6] rounded-md">
                <span>{product?.shop}</span>
                <span>{`>`}</span>
                <span>{product?.category}</span>
                <span>{`>`}</span>
                <strong className="text-black">{product?.product.title}</strong>
            </div>
            <div className="flex gap-10">
                <div className="w-1/2">
                    <GalleryProduct images={product?.product.product_Images} />
                </div>
                <div className="w-1/2 bg-[#f6f6f6] rounded-2xl">
                    <div className="p-4 flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">{product?.product.title}</h2>

                        {/** Colors*/}
                        <div className="text-xl flex flex-row gap-2">
                            <span className="font-semibold">
                                Colors:
                            </span>

                            <div className="flex gap-2">
                                {product?.product?.colors?.map((col: any, index: number) =>
                                (<span className="py-1 px-2 rounded-md bg-[#ededf6] text-cyan-700 text-base hover:cursor-pointer
                                     hover:bg-white hover:text-cyan-500
                                    " key={index}>{col.name}</span>))}
                            </div>
                        </div>

                        {/** Materials*/}
                        <div className="text-xl flex flex-row gap-2">
                            <span className="font-semibold">
                                Materials:
                            </span>

                            <div className="flex gap-2">
                                {product?.product?.materials?.map((mat: any, index: number) =>
                                (<span className="py-1 px-2 rounded-md bg-[#ededf6] text-cyan-700 text-base hover:cursor-pointer
                                     hover:bg-white hover:text-cyan-500 font-sans
                                    " key={index}>{mat.name}</span>))}
                            </div>
                        </div>

                        {/** Sizes*/}
                        <div className="text-xl flex flex-row gap-2">
                            <span className="font-semibold">
                                Sizes:
                            </span>

                            <div className="flex gap-2">
                                {product?.product?.sizes?.map((size: any, index: number) =>
                                (<span className="py-1 px-2 rounded-md bg-[#ededf6] text-cyan-700 text-base hover:cursor-pointer
                                     hover:bg-white hover:text-cyan-500 font-sans
                                    " key={index}>{size.name}</span>))}
                            </div>
                        </div>

                        {/** Quantity*/}
                        <div className="text-xl flex flex-row gap-2">
                            <span className="font-semibold">
                                Quantity:
                            </span>

                            <div className="flex gap-4 border border-b-gray-400 w-fit px-1 py-0.5 text-sm rounded-md items-center select-none">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="hover:cursor-pointer hover:opacity-80"
                                    onClick={() => setQuantity(preQuantity => preQuantity + 1)}
                                />
                                <span>{quantity}</span>
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    className="hover:cursor-pointer hover:opacity-60"
                                    onClick={() =>
                                        setQuantity((preQuantity) => {
                                            if (preQuantity === 1) return 1;
                                            return preQuantity - 1;
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/** Shipping */}
                        <div className="text-xl flex flex-col gap-3 border border-[#9797a3] w-full rounded p-4">
                            <h2 className="text-lg font-semibold">Shipping</h2>
                            <div className="grid grid-cols-2 gap-10 text-sm ml-5">
                                {/** Discount */}
                                <div className="flex gap-2">
                                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#cac1c1]">
                                        <FontAwesomeIcon icon={faPercent} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#807a7a]">Discount</span>
                                        <span className="font-semibold">Disc 50%</span>
                                    </div>
                                </div>

                                {/** Package */}
                                <div className="flex gap-2">
                                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#cac1c1]">
                                        <FontAwesomeIcon icon={faBoxOpen} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#807a7a]">Package</span>
                                        <span className="font-semibold">Regular package</span>
                                    </div>
                                </div>

                                {/** Delivery time */}
                                <div className="flex gap-2">
                                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#cac1c1]">
                                        <FontAwesomeIcon icon={faCalendarDays} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#807a7a]">Delivery Time</span>
                                        <span className="font-semibold">3-4 Working Days</span>
                                    </div>
                                </div>

                                {/** Estimation Arrive */}
                                <div className="flex gap-2">
                                    <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#cac1c1]">
                                        <FontAwesomeIcon icon={faTruck} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#807a7a]">Estimation Arrive</span>
                                        <span className="font-semibold">15 - 20 Otocber 2025</span>
                                    </div>
                                </div>

                                {/*Cart and Price*/}
                                <div className="text-xl flex flex-col gap-3 border border-[#dfdfe1] w-11/12 rounded p-2 ml-auto -translate-x-9 col-start-2 row-start-3">
                                    <div className="text-3xl font-semibold">{`$${`62.1`}`}</div>
                                    <div className="flex justify-between">
                                        <button className="rounded bg-[#ffb700] hover:opacity-90 py-1 px-5 font-semibold hover:cursor-pointer text-lg text-white/85">Add to cart</button>
                                        <div className="flex justify-center items-center border border-[#dfdfe1] p-1 rounded">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <Tabs tags={[{
                    idx: 0,
                    label: "Description",
                    content:
                        <div>
                            <p>{product.product.description}</p>
                        </div>
                },
                {
                    idx: 1,
                    label: "Features",
                    content: <div>
                        <h3 className="font-medium mb-2">The features of product: </h3>
                        <ul>
                            {product.product.features.map((feat: IFeature, index: number) => (
                                <li key={index} className="flex items-center gap-2"><FontAwesomeIcon icon={faPlus} className="text-[12px]" color="green" />{`${feat.feature}`}</li>))}
                        </ul>
                    </div>
                },
                {
                    idx: 2,
                    label: "Review",
                    content: <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-2xl">Rating & Reviews</h3>
                        <div className="flex">
                            <div className="w-1/2">
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <span className="text-7xl">4,5</span>
                                            <span className="text-3xl text-[#b8b8b8]">/5</span>
                                        </div>
                                        <div className="text-sm text-[#b8b8b8]">(50 New Reviews)</div>
                                    </div>

                                    <div className="w-full flex flex-col gap-3">
                                        <div className="flex flex-row gap-5 items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                <span className="font-medium">5</span>
                                            </div>
                                            <div className="relative w-full">
                                                <div className="bg-[#e9e6e6d2] w-full rounded-2xl h-3"></div>
                                                <div className="top-0 left-0 w-3/5 bg-black h-3 rounded-2xl absolute"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5 items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                <span className="font-medium">4</span>
                                            </div>
                                            <div className="relative w-full">
                                                <div className="bg-[#e9e6e6d2] w-full rounded-2xl h-3"></div>
                                                <div className="top-0 left-0 w-1/2 bg-black h-3 rounded-2xl absolute"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5 items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                <span className="font-medium">3</span>
                                            </div>
                                            <div className="relative w-full">
                                                <div className="bg-[#e9e6e6d2] w-full rounded-2xl h-3"></div>
                                                <div className="top-0 left-0 w-2/5 bg-black h-3 rounded-2xl absolute"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5 items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                <span className="font-medium">2</span>
                                            </div>
                                            <div className="relative w-full">
                                                <div className="bg-[#e9e6e6d2] w-full rounded-2xl h-3"></div>
                                                <div className="top-0 left-0 w-1/4 bg-black h-3 rounded-2xl absolute"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-5 items-center w-full">
                                            <div className="flex flex-row gap-2 items-center">
                                                <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                <span className="font-medium">1</span>
                                            </div>
                                            <div className="relative w-full">
                                                <div className="bg-[#e9e6e6d2] w-full rounded-2xl h-3"></div>
                                                <div className="top-0 left-0 w-1/5 bg-black h-3 rounded-2xl absolute"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <CustomCarousel responsiveCasourel={defaultResponsive}
                                    items={review} fullSlider={true}
                                    renderItem={(item: ICommentUser, idx: number) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg border-2 border-[#f7f7f7] w-11/12 px-3 py-2"
                                        >
                                            <div className="flex flex-col gap-4">
                                                {/* Portrait and name */}
                                                <div className="flex gap-2 items-center">
                                                    <img
                                                        className="w-10 h-10 rounded-full mr-2"
                                                        src={`/public/ui/images/defaut-portrait.jfif`}
                                                        alt=""
                                                    />
                                                    <span className="font-medium">{item.name}</span>
                                                </div>

                                                {/* Rate + Date */}
                                                <div className="flex gap-2 items-center justify-between ">
                                                    <span className="flex gap-2">
                                                        {Array.from({ length: item.rate }).map((_, i) => (
                                                            <FontAwesomeIcon icon={faStar} color="#ffb700" />
                                                        ))}
                                                    </span>
                                                    <span className="text-[#aeaeae]">{item.commentedAt}</span>
                                                </div>

                                                {/* Comment */}
                                                <p className="text-[#aeaeae]">
                                                    {`"${item.content}"`}
                                                </p>
                                            </div>
                                        </div>
                                    )} />
                            </div>
                        </div>
                    </div>
                },
                {
                    idx: 3,
                    label: "Similar",
                    content: <div>
                        <CustomCarousel responsiveCasourel={{
                            superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
                            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                        }}
                            items={productsByCategory}
                            renderItem={(item: ISimilarProduct, idx: number) => (
                                <div
                                    key={idx}
                                    className="rounded-lg border-2 border-[#f7f7f7] w-48 h-60 px-3 py-2 hover:shadow-xl hover:cursor-pointer group"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div >
                                            <img src={item.product_Images.length > 1 ? item.product_Images[1].url : item.product_Images[0].url} className="w-full h-32 rounded" alt="" />
                                        </div>
                                        <div className="flex flex-col gap-1 text-[12px]">
                                            <span className="font-semibold">{item.title}</span>
                                            <span className="truncate">{item.description}</span>
                                            <div className="flex gap-2">
                                                <div>
                                                    <StarRating rating={3} size={12} />
                                                </div>
                                                <div>(3.5) reviews</div>
                                            </div>
                                            <button className="rounded bg-[#ffb700] group-hover:opacity-90 group-hover:cursor-pointer
                                             p-1 font-semibold text-md text-white/85">View detail</button>
                                        </div>
                                    </div>
                                </div>
                            )} />
                    </div>
                }
                ]} />
            </div>
        </div>
    )
}

export default DetailPage;