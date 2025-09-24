import {
    IsString,
    IsOptional,
    IsEmail,
    IsBoolean,
    IsDateString,
    IsNumber
} from 'class-validator';

export class CreateUserDto {
    @IsNumber()
    @IsOptional()
    status_id!: number;

    @IsString()
    username!: string;

    @IsString()
    password!: string;

    @IsString()
    first_name!: string;

    @IsString()
    last_name!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    @IsString()
    portrait?: string;

    @IsOptional()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsString()
    providerId?: string

    @IsOptional()
    @IsString()
    provider?: string

    @IsOptional()
    @IsBoolean()
    isShop?: boolean;

    @IsOptional()
    @IsBoolean()
    email_verified_at?: boolean;

    @IsOptional()
    @IsDateString()
    last_login_at?: string;
}

export class createUserRole {
    @IsNumber()
    role_id: number = 1;

    @IsString()
    user_id!: string;
}
