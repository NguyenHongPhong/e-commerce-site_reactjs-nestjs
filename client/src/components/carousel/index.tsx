import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { ICustomListProps } from "@uiTypes/dto/product.dto";


function CustomCarousel<T>({ items, renderItem, fullSlider, responsiveCasourel }: ICustomListProps<T>) {
    let itemClassCss = '';
    if (fullSlider) {
        itemClassCss = 'w-full !flex-shrink-0'
    } else {
        itemClassCss = 'carousel-fit'
    }
    console.log(itemClassCss);

    if (!items || !renderItem || !responsiveCasourel) return <p>Loading.............</p>
    return (
        <Carousel
            responsive={responsiveCasourel}
            showDots={true}
            containerClass="px-8"
            itemClass={itemClassCss}  // ✅ Quan trọng khi hiển thị card là đánh giá người dùng
            sliderClass="w-full"
        >
            {items.map(renderItem)}
        </Carousel>
    )
}

export default CustomCarousel;