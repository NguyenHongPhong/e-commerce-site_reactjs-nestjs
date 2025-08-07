import {
    IsString,
    IsOptional,
    IsEmail,
    IsBoolean,
    IsDateString,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
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
    @IsBoolean()
    isShop?: boolean;

    @IsOptional()
    @IsBoolean()
    email_verified_at?: boolean;

    @IsOptional()
    @IsDateString()
    last_login_at?: string;
}
