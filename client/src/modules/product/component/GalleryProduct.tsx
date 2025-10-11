import { IPropsGallery } from "@uiTypes/dto/product.dto";
import { useState } from "react";
const GalleryProduct = ({ images }: IPropsGallery) => {
    const [indexImg, setIndexImages] = useState(0);
    const widthPercent = 100 / images?.length;

    const handleChangeThumbnail = (index: number) => {
        setIndexImages(index);
    };

    return (
        <div className={`rounded-xl w-full h-[500px] relative`}>
            <img
                src={images?.[indexImg]?.url}
                alt={`product-${images?.[indexImg]?.public_Id}`}
                className="w-full h-full object-cover object-center rounded-xl"
            />

            <div className="absolute top-3 left-0 flex w-full px-5 justify-between">
                {images?.map((_, index) => (
                    <div key={index} className={`h-1 rounded-md ${indexImg === index ? `rainbow-border` : `bg-[#c3c4c1]`}`}
                        style={{
                            width: `${widthPercent - 2}%`,
                            minWidth: '1px'
                        }}
                    >
                    </div>
                ))}
            </div>

            <div className="absolute bottom-2 left-0 flex justify-between w-full px-3 hover:cursor-pointer">
                {images?.map((img, index) => (
                    <div
                        key={index}
                        className={`p-[3px] rounded-xl ${indexImg === index ? "rainbow-border" : "bg-white"
                            }`}
                        style={{ width: `${widthPercent - 2}%` }}
                        onClick={() => handleChangeThumbnail(index)}
                    >
                        <img
                            className="rounded-xl h-28 w-full object-cover object-center"
                            src={img.url}
                            alt={`thumbnail-${index}`}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default GalleryProduct;