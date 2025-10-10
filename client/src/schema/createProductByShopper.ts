import { z } from "zod";

export const productSchema = (hasCategories: boolean) =>
    z.object({
        // Nếu categories có sẵn → bắt buộc chọn
        categoriesExisted: hasCategories
            ? z.string().min(1, "Please select a category")
            : z.string().optional(),

        // Nếu categories trống → phải nhập name + description
        categoryNew: hasCategories
            ? z.string().optional()
            : z.string().min(1, "Category name is required"),
        description: hasCategories
            ? z.string().optional()
            : z.string().min(1, "Category description is required"),

        // Các field khác giữ nguyên
        title: z.string().min(1, "Title is required"),
        descriptionProduct: z
            .string()
            .min(1, "Description is required"),
        price: z
            .coerce.number()
            .refine((val) => !isNaN(val), { message: "Price must be a number" })
            .min(1, "Price must be greater than or equal to 1"),
        colors: z.array(z.string()).min(1, "Please add at least one color"),
        materials: z
            .array(z.string())
            .min(1, "Please add at least one material"),
        sizes: z.array(z.string()).min(1, "Please add at least one size"),

        imgs: z
            .any()
            .refine(
                (files) => files && files.length > 0,
                "At least 1 image is required"
            ),
    });
