import { IsString, IsNumber, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value)) // convert string -> number
    price!: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value)) // convert string -> number
    category!: number;

    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value]) // ép thành array
    colors!: string[];

    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value])
    materials!: string[];

    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value : [value]) // ép thành array
    sizes!: string[];
}
