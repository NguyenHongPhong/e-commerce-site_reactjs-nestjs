import React, { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppDispatch } from "hooks";
import { disableLoading, enableLoading } from "@reducers/loading";
import { notify } from "@utils/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddressComponent from "@components/address";
import { useAppSelector } from "hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import ShareLocationButton from "@components/shareLocation";
import { ShopperRegisterForm, shopperRegisterSchema } from "schema/shopperRegister.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { ShopperDTO } from "@uiTypes/dto/shopper.dto";
import { useRegisterShopperMutation } from "../queries";
export default function () {
    const profile = useAppSelector(state => state.auth.user);
    const { control, register, handleSubmit, setValue, formState: { errors }, watch, trigger, reset } = useForm<ShopperRegisterForm>({
        resolver: zodResolver(shopperRegisterSchema),
        defaultValues: {
            name: "",
            logo: undefined,
            banner: undefined,
            description: "",
            contactShopper: "",
            contactRegistered: false,
            address: {
                province: "",
                district: "",
                ward: "",
                street: "",
            },
            location: {
                latitude: 0,
                longitude: 0
            }
        },
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const dispatch = useAppDispatch();
    const [logoPreview, setLogoPreview] = useState<string>();
    const [bannerPreview, setBannerPreview] = useState<string>();
    const [spinning, setSpinning] = useState(false);
    const contactShopper = watch("contactShopper");
    const contactRegistered = watch("contactRegistered") || false;
    const province = watch("address.province");
    const district = watch("address.district");
    const ward = watch("address.ward");
    const registerShopperMutation = useRegisterShopperMutation();

    const [latitude, longitude] = useWatch({
        control,
        name: [
            "location.latitude",
            "location.longitude",
        ],
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("contactShopper", e.target.value, { shouldValidate: true });
        setValue("contactRegistered", false, { shouldValidate: true });
    };

    const handleRefreshContact = () => {
        setValue("contactShopper", "", { shouldValidate: true });
        setValue("contactRegistered", false, { shouldValidate: true });
        setSpinning(true);
        setTimeout(() => setSpinning(false), 500);
    };

    const handleRadioChange = () => {
        setValue("contactRegistered", true, { shouldValidate: true });
        setValue("contactShopper", "", { shouldValidate: true });
    };

    const handleLogoChange = (files: FileList | null, onChange: (files: FileList | null) => void) => {
        if (!files || files.length === 0) return;
        const imgPreview = URL.createObjectURL(files[0]);
        setLogoPreview(imgPreview);
        onChange(files);
        trigger("logo");
    };

    const handleBannerChange = (files: FileList | null, onChange: (files: FileList | null) => void) => {
        if (!files || files.length === 0) return;
        const imgPreview = URL.createObjectURL(files[0]);
        setBannerPreview(imgPreview);
        onChange(files);
        trigger("banner");
    };

    const submit = (data: ShopperRegisterForm) => {
        if (!data) return;

        const formData = new FormData();
        const shopperDto: ShopperDTO = {
            name: data.name,
            address: data.address.street,
            contactRegistered: data.contactRegistered,
            contactShopper: data.contactShopper || "",
            description: data.description,
            latitude: data.location.latitude,
            longitude: data.location.longitude
        }

        formData.append("folder", "shopper");
        formData.append("data", JSON.stringify(shopperDto));
        if (data.logo?.[0]) formData.append("logo", data.logo[0]);
        if (data.banner?.[0]) formData.append("banner", data.banner[0]);

        registerShopperMutation.mutate(formData, {
            onSuccess: (data) => {
                notify(data.message, "success");
                reset();
                setTimeout(() => { }, 2000);
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        })
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            {/* name */}
            <label className="block mb-3">
                <span className="text-md font-semibold">Name shop</span>
                <input
                    className="mt-1 block w-full rounded-lg border p-2"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </label>

            {/* logo */}
            <label className="block mb-3">
                <span className="text-md font-semibold">Logo shop</span>
                <Controller
                    control={control}
                    name="logo"
                    defaultValue={null}
                    render={({ field }) => (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full rounded-lg border p-2 mb-2"
                                {...register("logo")}
                                onChange={(e) => handleLogoChange(e.target.files, field.onChange)}
                            />
                            {errors.logo && (
                                <p className="text-red-500">{String(errors.logo.message)}</p>
                            )}
                        </>
                    )}
                ></Controller>

                {logoPreview && (
                    <div className="flex gap-3 flex-wrap">
                        <div className="w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center">
                            <img
                                src={logoPreview}
                                alt="logo"
                                className="mw-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                )}
            </label>

            {/* banner */}
            <label className="block mb-3">
                <span className="text-md font-semibold">Banner</span>
                <Controller
                    control={control}
                    name="banner"
                    defaultValue={null}
                    render={({ field }) => (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full rounded-lg border p-2 mb-2"
                                {...register("banner")}
                                onChange={(e) => handleBannerChange(e.target.files, field.onChange)} />
                            {errors.banner && (
                                <p className="text-red-500 text-sm">{String(errors.banner.message)}</p>
                            )}
                        </>
                    )}
                ></Controller>

                {bannerPreview && (<div className="flex gap-3 flex-wrap">
                    <div className="w-28 h-20 rounded overflow-hidden border flex items-center justify-center">
                        <img
                            src={bannerPreview}
                            alt="banner"
                            className="mw-full h-full object-cover object-center"
                        />
                    </div>
                </div>)}
            </label>

            {/* description */}
            <label className="mb-3 flex flex-col ">
                <span className="text-md font-semibold">Description</span>
                <textarea className="border rounded-lg p-2" {...register("description")} ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
            </label>

            {/* contact */}
            <label className="mb-3 flex flex-col ">
                <span className="text-md font-semibold">Contact</span>
                <input
                    type="text"
                    className={`mt-1 block w-full rounded-lg border p-2 ${contactRegistered ? `border-black/15 cursor-not-allowed` : ``}`}
                    {...register("contactShopper")}
                    value={contactShopper || ""}
                    onChange={handleTextChange}
                    disabled={contactRegistered}
                />
                <span className="italic">Or contact that you used to register profile</span>
                <div className="flex items-center">
                    <div className="flex items-center">
                        <input
                            className={`${contactShopper ? `opacity-80 cursor-not-allowed` : ``}`}
                            {...register("contactRegistered")}
                            type="radio"
                            checked={contactRegistered}
                            onChange={handleRadioChange}
                            disabled={contactShopper != ""}
                        />
                    </div>
                    <span className="mx-2">{profile?.phone_number}</span>
                    <FontAwesomeIcon icon={faArrowsRotate} onClick={handleRefreshContact} className={`hover:cursor-pointer  ${spinning ? "animate-spin" : ""}`} />
                </div>
                {errors.contactShopper && (
                    <p className="text-red-500">{errors.contactShopper.message}</p>
                )}
            </label>

            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <AddressComponent value={field.value} onChange={field.onChange} />
                )}
            />
            {errors.address?.province && (
                <p className="text-red-500 text-sm">{errors.address.province?.message}</p>
            )}
            {province && errors.address?.district && (
                <p className="text-red-500 text-sm">{errors.address.district?.message}</p>
            )}
            {district && errors.address?.ward && (
                <p className="text-red-500 text-sm">{errors.address.ward?.message}</p>
            )}
            {ward && errors.address?.street && (
                <p className="text-red-500 text-sm">{errors.address.street?.message}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 justify-between items-center relative mt-5">
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <ShareLocationButton value={field.value} onChange={field.onChange} />
                    )}
                />

                {longitude > 0 && latitude > 0 ? <FontAwesomeIcon icon={faCheckDouble} size="2x" color="green" className="left-56 absolute" /> : <></>}
                {errors.location?.latitude && (
                    <p className="text-red-500 text-sm">{errors.location.latitude.message}</p>
                )}
                {errors.location?.longitude && (
                    <p className="text-red-500 text-sm">{errors.location.longitude.message}</p>
                )}

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
