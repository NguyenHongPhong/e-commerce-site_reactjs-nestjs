// src/otp/dto/verify-otp.dto.ts
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class VerifyOtpDto {
    @IsString() @IsNotEmpty()
    flowId!: string;

    @IsString() @IsNotEmpty() @Length(4, 6)
    otp!: string;
}
