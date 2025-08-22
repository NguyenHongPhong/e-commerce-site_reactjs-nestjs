export interface IUserDto {
    status_id?: number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    portrait?: string;
    phone_number?: string;
    isShop?: boolean;
    email_verified_at?: boolean;
    last_login_at?: string;
    provider?: string,
    providerId?: string
}

export interface IUserResetPassword {
    email: string,
    newPassword: string
}


export interface IProfileUserDto {
    id: string;
    status_id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    portrait: string | null;
    phone_number: string | null;
    isShop: boolean;
    email_verified_at: boolean;
    provider: string | null;
    created_at: Date;
};
