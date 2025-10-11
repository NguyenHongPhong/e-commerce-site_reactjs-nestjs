import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@modules/product/queries";
import GalleryProduct from "@modules/product/component/GalleryProduct";
function DetailPage() {
    const { id } = useParams();
    const { data: product } = useGetProductByIdQuery(id!);

    return (
        <div className="py-10">
            <div className="bg-[#f6f6f6] p-3 flex gap-5 text-[#aeadb6] rounded-md">
                <span>{product?.shop}</span>
                <span>{`>`}</span>
                <span>{product?.category}</span>
                <span>{`>`}</span>
                <strong className="text-black">{product?.product.title}</strong>
            </div>
            <div className="mt-10 flex gap-10">
                <div className="w-1/2">
                    <GalleryProduct images={product?.product.product_Images} />
                </div>
                <div className="w-1/2">

                </div>
            </div>
        </div>
    )
}

export default DetailPage;