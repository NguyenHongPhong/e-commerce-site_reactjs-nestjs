import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Tags from "@components/tag/Tag";
import { useCreateProductMutation, } from "../queries";
import { useAppDispatch } from "hooks";
import { disableLoading, enableLoading } from "@reducers/loading";
import { notify } from "@utils/toast";
import { useGetAllProductMutation } from "../queries";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ProductFormValues, productSchema } from "schema/productSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICategoryDto, IProductDto } from "@uiTypes/dto/product.dto";
export default function ProductForm() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: categories } = useGetAllProductMutation();

    const dispatch = useAppDispatch();
    const createProductMutation = useCreateProductMutation();
    const [previews, setPreviews] = useState<string[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isOpenForm, setIsOpneForm] = useState(false);

    // Preview cho ảnh sản phẩm
    const handleImagesChange = (files: FileList | null) => {
        if (!files) return;
        const urls = Array.from(files).map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        setValue("imgs", files as any);
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<ProductFormValues>(
        {
            resolver: zodResolver(productSchema),
            defaultValues: {
                _categoriesExist: false,
                selectCategory: "",
                categoryName: "",
                categoryDescription: "",
                imgCategories: [],
                imgs: [],
                colors: [],
                materials: [],
                sizes: [],
            },
            mode: "onSubmit",
        });

    useEffect(() => {
        setValue("_categoriesExist", !!(categories && categories.length > 0));
    }, [categories, setValue]);


    const submit = (data: ProductFormValues) => {
        const formData = new FormData();
        const categoryData: ICategoryDto = {
            name: data.categoryName,
            description: data.categoryDescription,
            selectCategory: data.selectCategory
        }
        const productData: IProductDto = {
            title: data.title,
            colors: data.colors,
            description: data.description,
            materials: data.materials,
            price: data.price,
            sizes: data.sizes
        };

        formData.append("category", JSON.stringify(categoryData));
        formData.append("product", JSON.stringify(productData));
        formData.append("folder", "Product Images");
        Array.from(data.imgCategories ?? []).forEach((file) => {
            formData.append("categoryImgs", file as File); // ⚡ type assertion
        });

        Array.from(data.imgs ?? []).forEach((file) => {
            formData.append("productImgs", file as File); // ⚡ type assertion
        });


        // console.log("✅ Valid form data:", data);


        //         dispatch(enableLoading());

        createProductMutation.mutate(formData, {
            onSuccess: (data: any) => {
                dispatch(disableLoading());
                notify(data.message, "success");
                reset();
                queryClient.invalidateQueries({ queryKey: ["products"] });
            },
            onError: (error: any) => {
                dispatch(disableLoading());
                console.error("❌ Error:", error);
            },
        });
    };

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const urls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            setPreview(urls);
        }
    };

    const handleCreateNewCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setIsOpneForm(e.target.checked);
        setValue("selectCategory", "NONE");
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10"
        >
            {/** Categories */}
            <input type="hidden" {...register("_categoriesExist")} />

            {categories && categories.length > 0 && (
                <div className="flex flex-row justify-end gap-3">
                    <div className="flex gap-2">
                        <input type="radio" checked={!isOpenForm} onChange={(e) => setIsOpneForm(!e.target.checked)} className="hover:cursor-pointer" />
                        <span className="font-bold">Select available categories</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="radio" checked={isOpenForm} onChange={handleCreateNewCategory} className="hover:cursor-pointer" />
                        <span className="font-bold">Create new category</span>
                    </div>
                </div>
            )}

            <label className="flex-col flex">
                <h3 className="text-xl font-medium">Categories</h3>
                {categories && categories.length > 0 && (
                    <div>
                        <select
                            {...register("selectCategory")}
                            className="mt-2 block w-full rounded-lg border p-2 h-11 disabled:cursor-not-allowed  
                            disabled:bg-gray-100 disabled:text-gray-400"
                            disabled={isOpenForm}
                        >
                            <option value="">Select category</option>
                            {categories.map((cat: any) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        {errors.selectCategory && (
                            <p className="text-red-500 text-sm">{errors.selectCategory.message}</p>
                        )}
                    </div>
                )}

                {(categories === undefined || categories.length === 0 || isOpenForm) && ((<div className="flex flex-col gap-3 p-4 w-full border rounded-lg my-3 ">
                    {/* Name required */}
                    <label className="text-sm font-medium">Name</label>
                    <input
                        {...register("categoryName")}
                        type="text"
                        placeholder="Category name"
                        className="border p-2 rounded"
                    />

                    {errors.categoryName && (
                        <p className="text-red-500 text-sm">{errors.categoryName.message}</p>
                    )}

                    <label className="text-sm font-medium">Description</label>
                    {/* Description required */}
                    <input
                        {...register("categoryDescription")}
                        type="text"
                        placeholder="Description"
                        className="border p-2 rounded"
                    />
                    {errors.categoryDescription && (
                        <p className="text-red-500 text-sm">{errors.categoryDescription.message}</p>
                    )}

                    {/* Multiple images required */}
                    <Controller
                        name="imgCategories"
                        control={control}
                        rules={{
                            validate: (files) =>
                                files && files.length > 0 || "At least one image is required",
                        }}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="border p-2 rounded"
                                    onChange={(e) => {
                                        const files = e.target.files ?? new DataTransfer().files;
                                        field.onChange(files); // ✅ set value cho RHF
                                        setValue("imgCategories", files, { shouldValidate: true });
                                        handlePreview(e); // preview hình
                                    }}
                                />
                            </div>
                        )}
                    />


                    {/* Preview images */}
                    <div className="flex gap-2 flex-wrap">
                        {preview.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt="preview"
                                className="w-16 h-16 object-cover rounded"
                            />
                        ))}
                    </div>

                    {errors.imgCategories?.message && (
                        <p className="text-red-500 text-sm">{String(errors.imgCategories.message)}</p>
                    )}
                </div>))}
            </label>


            <div className="my-5">
                <h3 className=" font-medium mb-3 text-xl">Product</h3>
                <div className="border border-b-black rounded-xl p-4">
                    {/* Title */}
                    <label className="block mb-3">
                        <span className="text-sm font-medium">Title</span>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="mt-1 block w-full rounded-lg border p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </label>

                    {/* Description */}
                    <label className="block mb-3">
                        <span className="text-sm font-medium">Description</span>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="mt-1 block w-full rounded-lg border p-2"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors.description.message)}
                            </p>
                        )}
                    </label>

                    {/* Price + Category */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <label className="block">
                            <span className="text-sm font-medium">Price</span>

                            <input
                                className="mt-1 block w-full rounded-lg border p-2"
                                type="text"
                                {...register("price")}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {String(errors.price.message)}
                                </p>
                            )}
                        </label>
                    </div>

                    <div className="flex">
                        <span className="italic font-semibold underline mr-3">Note:</span>
                        <p className="">In below section, after you've wrote one value, click "Enter" to save it</p>
                    </div>

                    <div className="border-2 border-cyan-700 rounded-2xl p-3 mt-3">
                        {/* Colors */}
                        <div className="mb-6">
                            <label className="block mb-2">
                                <span className="text-sm font-medium">Colors</span>

                                <Controller
                                    name="colors"
                                    control={control}
                                    rules={{
                                        required: "Please add at least one color",
                                        validate: (v) =>
                                            (v && v.length > 0) || "This field cannot be empty",
                                    }}
                                    render={({ field }) => (
                                        <Tags
                                            values={field.value}
                                            onChange={field.onChange}
                                            field="colors"
                                        />
                                    )}
                                />

                                {errors.colors && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.colors.message}
                                    </p>
                                )}
                            </label>
                        </div>

                        {/* Materials */}
                        <div className="mb-6">
                            <label className="block mb-2">
                                <span className="text-sm font-medium">Materials</span>

                                <Controller
                                    name="materials"
                                    control={control}
                                    rules={{
                                        required: "Please add at least one material",
                                        validate: (v) => (v && v.length > 0) || "This field cannot be empty",
                                    }}
                                    render={({ field }) => (
                                        <Tags
                                            values={field.value}
                                            onChange={field.onChange}
                                            field="materials"
                                        />
                                    )}
                                />

                                {errors.materials && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.materials.message as string}
                                    </p>
                                )}
                            </label>
                        </div>

                        {/* Sizes */}
                        <div className="mb-6">
                            <label className="block mb-2">
                                <span className="text-sm font-medium">Sizes</span>

                                <Controller
                                    name="sizes"
                                    control={control}
                                    rules={{
                                        required: "Please add at least one size",
                                        validate: (v) => (v && v.length > 0) || "This field cannot be empty",
                                    }}
                                    render={({ field }) => (
                                        <Tags values={field.value} onChange={field.onChange} field="sizes" />
                                    )}
                                />

                                {errors.sizes && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.sizes.message as string}
                                    </p>
                                )}
                            </label>
                        </div>

                    </div>

                    {/* Images */}
                    <div className="mb-6">
                        <label className="block mb-2">
                            <span className="text-sm font-medium">Images</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImagesChange(e.target.files)}
                                className="mt-1 block w-full"
                            />
                            {/* hidden input to validate imgs */}

                            {/* File input dùng Controller */}
                            <Controller
                                name="imgs"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="border p-2 rounded"
                                        onChange={(e) => {
                                            const files = e.target.files ?? new DataTransfer().files;
                                            field.onChange(files); // ✅ cập nhật giá trị form
                                            setValue("imgs", files, { shouldValidate: true }); // ✅ kích hoạt validate
                                            handleImagesChange(e.target.files); // update preview
                                        }}
                                    />
                                )}
                            />

                            {/* Hiển thị lỗi */}
                            {errors.imgs && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.imgs.message as string}
                                </p>
                            )}
                        </label>

                        <div className="flex gap-3 flex-wrap">
                            {previews.map((src, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-24 rounded overflow-hidden border"
                                >
                                    <img
                                        src={src}
                                        alt={`preview-${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
