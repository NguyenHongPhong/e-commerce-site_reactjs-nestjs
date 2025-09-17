import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CategoryDto } from "@uiTypes/dto/category.dto";
import { getCategories } from "@api/category";
import Tags from "@components/tag/Tag";
import { FormCreateProductValues } from "@uiTypes/ui";
import { useCreateProductMutation } from "../queries/product.mutation";

export default function ProductForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormCreateProductValues>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: 0,
            colors: [],
            materials: [],
            sizes: [],
            imgs: []
        },
    });

    const createProductMutation = useCreateProductMutation();
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const imgs = watch("imgs");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await getCategories();
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    const handleImagesChange = (files: FileList | null) => {
        if (!files) return;
        const arr = Array.from(files);
        setValue("imgs", arr, { shouldValidate: true });

        const urls = arr.map((f) => URL.createObjectURL(f));
        setPreviews(urls);
    };

    const submit = (data: FormCreateProductValues) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("category", String(data.category));
        data.imgs.forEach((file) => formData.append("imgs", file));
        data.colors.forEach((color) => formData.append("colors", color));
        data.materials.forEach((material) => formData.append("materials", material));
        data.sizes.forEach((size) => formData.append("sizes", size));

        createProductMutation.mutate(formData);
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
        >
            <h2 className="text-2xl font-semibold mb-4">Create product</h2>

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
                        type="number"
                        step="0.01"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: (v) => v >= 1 || "Price must be greater than 1",
                        })}
                        className="mt-1 block w-full rounded-lg border p-2"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.price.message)}
                        </p>
                    )}
                </label>

                <label className="flex-col flex">
                    <span className="text-sm font-medium">Categories</span>
                    {categories.length > 0 && (
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="mt-2 block w-full rounded-lg border p-2 h-11"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.category.message)}
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
                    <input
                        type="hidden"
                        {...register("imgs", {
                            validate: (files) =>
                                (files && files.length > 0) || "At least 1 image is required",
                        })}
                    />
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
    );
}
