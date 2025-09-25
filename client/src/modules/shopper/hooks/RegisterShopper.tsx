import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormCreateProductValues } from "@uiTypes/ui";
import { useCreateProductMutation } from "@modules/product/queries";
import { useAppDispatch } from "hooks";
import { disableLoading, enableLoading } from "@reducers/loading";
import { notify } from "@utils/toast";
import { useQueryAllCategory } from "@modules/category/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddressComponent from "@components/address";
import { useAppSelector } from "hooks";
import { IContact } from "@uiTypes/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import ShareLocationButton from "@components/shareLocation";
import { IFormShopperRegister } from "@uiTypes/ui";
export default function () {
    const profile = useAppSelector(state => state.auth.user);
    const { control, register, handleSubmit } = useForm<IFormShopperRegister>({
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
        },
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const dispatch = useAppDispatch();
    const createProductMutation = useCreateProductMutation();
    const [logoPreview, setLogoPreview] = useState<string>();
    const [bannerPreview, setBannerPreview] = useState<string>();
    const [isContact, setIsContact] = useState<IContact>();
    const initialState: IContact = { newContact: "", contactRegistered: false };
    const [spinning, setSpinning] = useState(false);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsContact({
            newContact: e.target.value,
            contactRegistered: false, // khi nhập text thì tắt radio
        });
    };

    const handleRefreshContact = () => {
        setIsContact(initialState);
        setSpinning(true);
        setTimeout(() => setSpinning(false), 500);
    };

    const handleRadioChange = () => {
        setIsContact({
            newContact: "",
            contactRegistered: true, // chọn radio thì xoá text
        });
    };

    const handleLogoChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const imgPreview = URL.createObjectURL(files[0]);
        setLogoPreview(imgPreview);
    };

    const handleBannerChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const imgPreview = URL.createObjectURL(files[0]);
        setBannerPreview(imgPreview);
    };

    const submit = (data: IFormShopperRegister) => {
        if (!data) return;
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
        >

            {/* name */}
            <label className="block mb-3">
                <span className="text-sm font-medium">Name shop</span>
                <input
                    className="mt-1 block w-full rounded-lg border p-2"
                    {...register("name")}
                />
            </label>

            {/* logo */}
            <label className="block mb-3">
                <span className="text-sm font-medium">Logo shop</span>
                <input
                    type="file"
                    className="mt-1 block w-full rounded-lg border p-2 mb-2"
                    {...register("logo")}
                    onChange={(e) => handleLogoChange(e.target.files)}
                />

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
                <span className="text-sm font-medium">Banner</span>
                <input
                    type="file"
                    className="mt-1 block w-full rounded-lg border p-2 mb-2"
                    {...register("banner")}
                    onChange={(e) => handleBannerChange(e.target.files)}
                />

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
                <span className="text-sm font-medium">Description</span>
                <textarea className="border rounded-lg p-2" {...register("description")} ></textarea>
            </label>

            {/* contact */}
            <label className="mb-3 flex flex-col ">
                <span className="text-sm font-medium">Contact</span>
                <input
                    type="text"
                    className={`mt-1 block w-full rounded-lg border p-2 ${isContact?.contactRegistered ? `border-black/15 cursor-not-allowed` : ``}`}
                    {...register("contactShopper")}
                    value={isContact?.newContact || ""}
                    onChange={handleTextChange}
                    disabled={isContact?.contactRegistered} // disable nếu đã chọn radio
                />
                <span className="font-semibold italic">Or contact that you used to register profile</span>
                <div className="flex items-center">
                    <div className="flex items-center">
                        <input
                            {...register("contactRegistered")}
                            type="radio"
                            checked={isContact?.contactRegistered || false}
                            onChange={handleRadioChange}
                            disabled={!!isContact?.newContact} // disable nếu đã nhập text
                            className={` ${!!isContact?.newContact ? `opacity-80 cursor-not-allowed` : ``}`}
                            name="contactRegistered"
                        />
                    </div>
                    <span className="mx-2">{profile?.phone_number}</span>
                    <FontAwesomeIcon icon={faArrowsRotate} onClick={handleRefreshContact} className={`hover:cursor-pointer  ${spinning ? "animate-spin" : ""}`} />
                </div>
            </label>

            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <AddressComponent value={field.value} onChange={field.onChange} />
                )}
            />

            {/* Buttons */}
            <div className="flex gap-3 justify-between">
                <ShareLocationButton />
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
