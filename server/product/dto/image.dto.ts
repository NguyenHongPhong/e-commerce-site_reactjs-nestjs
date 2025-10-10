import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ImageDto {
    @IsString()
    @IsNotEmpty()
    fieldname?: string;

    @IsString()
    @IsNotEmpty()
    originalname?: string;

    @IsString()
    @IsNotEmpty()
    encoding?: string;

    @IsString()
    @IsNotEmpty()
    mimetype?: string;

    @IsString()
    @IsNotEmpty()
    filename?: string;

    @IsString()
    @IsNotEmpty()
    path?: string;

    @IsNumber()
    size?: number;
}

