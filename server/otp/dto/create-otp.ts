import {
    IsString,
    IsEmail,
    IsDate,
    IsNotEmpty,
    Length
} from 'class-validator';


export class CreateOtpDto {

    @IsEmail({}, { message: 'Invalid email' })
    email!: string;

    @IsNotEmpty()
    @Length(6, 6)
    @IsString()
    code!: string;

    @IsDate()
    expiresAt!: Date;
}
