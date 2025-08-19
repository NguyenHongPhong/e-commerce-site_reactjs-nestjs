import {
    IsString,
    IsEmail,
} from 'class-validator';

export class IResetPasswordUserDto {
    @IsString()
    newPassword!: string;

    @IsEmail()
    email!: string;
}
