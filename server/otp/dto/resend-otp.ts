import { IsString, IsNotEmpty } from 'class-validator';

export class ResendOtpDto {
    @IsString() @IsNotEmpty()
    flowId!: string;
}
