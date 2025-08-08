import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

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