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

export interface IDataUserDto {
    created_at: Date,
    email: string,
    email_verified_at: boolean,
    first_name: string,
    id: string,
    isShop: boolean,
    last_login_at: Date,
    last_name: string,
    phone_number: string,
    portrait: string,
    provider: string,
    status_id: number,
    username: string
}
