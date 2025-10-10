import { IsString, IsNotEmpty, IsOptional, IsNumber, } from 'class-validator';

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    selectCategory?: string
}

export class createCategoryDro {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    slug!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsOptional()
    parent_id?: number;

    @IsString()
    @IsNotEmpty()
    id_shop!: string;
}


export class createCategoryImgDto {
    @IsString()
    @IsNotEmpty()
    category_id!: number;

    @IsString()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsNotEmpty()
    publicId!: string;
}