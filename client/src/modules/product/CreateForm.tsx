import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CategoryDto } from "@uiTypes/dto/category.dto";
import { getCategories } from "@api/category";
import { WithContext as ReactTags } from "react-tag-input";


type Tag = { id: string; text: string };

type FormValues = {
    title: string;
    description: string;
    price: number;
    category: number | "";
    colors: Tag[];
    materials: string;
    sizes: string;
    imgs: File[];
};

export default function ProductForm({
    onSubmit,
    initialValues,
}: {
    onSubmit?: (data: FormValues | FormData) => void;
    initialValues?: Partial<FormValues>;
}) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: "",
            colors: [],
            materials: "",
            sizes: "",
            imgs: [],
            ...initialValues,
        },
    });

    const KeyCodes = {
        enter: 13,
        comma: 188,
    };
    const delimiters = [KeyCodes.enter, KeyCodes.comma];

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

    const submit = (data: FormValues) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("category", String(data.category));

        // convert tags to text array
        data.colors.forEach((c) => formData.append("colors[]", c.text));

        data.imgs.forEach((file) => formData.append("imgs", file));

        if (onSubmit) onSubmit(formData);

        console.log("submit plain:", {
            ...data,
            colors: data.colors.map((c) => c.text),
            imgs: data.imgs.map((f) => f.name),
        });
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
                    placeholder="Product title"
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
                    placeholder="Short description"
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

            {/* Colors with ReactTags */}
            <div className="mb-4">
                <span className="text-sm font-medium">Colors</span>
                <Controller
                    name="colors"
                    control={control}
                    rules={{ required: "At least one color is required" }}
                    render={({ field, fieldState }) => (
                        <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[3rem]">
                            <ReactTags
                                tags={field.value as any}
                                delimiters={delimiters}
                                handleDelete={(i) =>
                                    field.onChange(field.value.filter((_, index) => index !== i))
                                }
                                handleAddition={(tag) => field.onChange([...field.value, tag])}
                                handleDrag={(tag, currPos, newPos) => {
                                    const newTags = [...field.value];
                                    newTags.splice(currPos, 1);
                                    newTags.splice(newPos, 0, tag as any);
                                    field.onChange(newTags);
                                }}
                                inputFieldPosition="inline"
                                autocomplete
                                classNames={{
                                    tags: "flex flex-wrap gap-2",
                                    tag: "inline-flex items-center",
                                    remove: "ml-1 cursor-pointer text-red-500 hover:text-red-700 font-bold"
                                }}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>
                    )}
                />
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
