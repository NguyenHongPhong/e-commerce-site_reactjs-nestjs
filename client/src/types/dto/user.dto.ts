export interface IUserDto {
    status_id?: string
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
}
