import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Dispatch, SetStateAction } from "react";

export interface ISideDirection {
    side: string,
    arrowSide: IconDefinition,
    onClick: () => void
}

export interface IDot {
    indexSlider: number,
    quantity: number
}

export interface ILoadingState {
    value: boolean
}

export interface FormValues {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirm_password: string;
    email: string;
    phone_number: string;
    remember_me: boolean;
};

export interface IFormLoginValues {
    email: string;
    password: string;
    remember_me: boolean;
};

export interface IFormEmail {
    email: string;
};

export interface IOtpInput {
    otp: string;
};

export interface OtpCountdownProps {
    initialSeconds: number;
    onExpire?: () => void;
    otpVerify: boolean;
    reSendOtp?: Dispatch<SetStateAction<boolean>>;
    onNonExpire?: () => void;
}


export interface IFormResetPassword {
    password: string;
    confirm_password: string;
};

export interface IClockTime {
    hour: number;
    minute: number;
    second: number;
}

export type SessionParams =
    | { serverNow: number; expiresIn: number }
    | undefined;

export type ErrorResponse = {
    code?: string;
};

export interface ICategoryItem {
    id: number;
    name: string,
    slug: string,
    url: string
}

export type Props = {
    children: React.ReactNode;
};

export type TagProps = {
    values: string[];
    onChange: (newValues: string[]) => void;
    field: string
};

export type FormCreateProductValues = {
    title: string;
    description: string;
    price: number;
    category: number | 0;
    colors: string[];
    materials: string[];
    sizes: string[];
    imgs: File[];
};