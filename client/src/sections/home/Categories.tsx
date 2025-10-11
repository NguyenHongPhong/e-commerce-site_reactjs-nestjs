import { useGetAllCategoryMutation } from "@modules/product/queries";
import Category from "@components/category/Category";
export default function () {
  const { data: categories } = useGetAllCategoryMutation();
  return (<div className="@container">
    <div className="w-full">
      <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500)">CATEGORIES</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {categories && categories?.map((category: any, index: number) => <Category key={index} id={index} name={category.name} slug={category.slug} url={category.images[0].url} />)}
      </div>
    </div>
  </div>)
}