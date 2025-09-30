import { z } from "zod";

const addressSchema = z.object({
    province: z.string().nonempty("Province is required"),
    district: z.string().nonempty("District is required"),
    ward: z.string().nonempty("Ward is required"),
    street: z.string().nonempty("Street is required"),
});

const locationSchema = z.object({
    latitude: z.number().refine(val => val !== 0, {
        message: "Latitude must be provided",
    }),
    longitude: z.number().refine(val => val !== 0, {
        message: "Longitude must be provided",
    }),
});

export const shopperRegisterSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        logo: z.any(),     // nhận tất cả
        banner: z.any(),
        description: z.string().min(1, "Description is required"),
        contactShopper: z.string().optional(),
        contactRegistered: z.any(),
        address: addressSchema,
        location: locationSchema,
    })
    .superRefine((data, ctx) => {
        // validate logo
        const logoFile = data.logo?.[0];
        if (!logoFile || !(logoFile instanceof File) || logoFile.size === 0) {
            ctx.addIssue({
                path: ["logo"],
                code: "custom",
                message: "Logo file is required",
            });
        }

        // validate banner
        const bannerFile = data.banner?.[0];
        if (!bannerFile || !(bannerFile instanceof File) || bannerFile.size === 0) {
            ctx.addIssue({
                path: ["banner"],
                code: "custom",
                message: "Banner file is required",
            });
        }

        // validate contact
        if (!data.contactShopper && !data.contactRegistered) {
            ctx.addIssue({
                path: ["contactShopper"],
                code: "custom",
                message: "Either contactShopper or contactRegistered is required",
            });
        }
    });


export type ShopperRegisterForm = z.infer<typeof shopperRegisterSchema>;
