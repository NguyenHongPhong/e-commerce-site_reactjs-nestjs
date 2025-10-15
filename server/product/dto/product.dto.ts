import { IsString, IsNotEmpty, IsArray, IsNumberString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDto } from './image.dto';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsArray()
    @IsString({ each: true })
    colors!: string[];

    @IsArray()
    @IsString({ each: true })
    sizes!: string[];

    @IsArray()
    @IsString({ each: true })
    materials!: string[];

    @IsArray()
    @IsString({ each: true })
    features!: string[];

    @IsNumberString()
    price!: string;

    @IsString()
    description!: string;


    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images!: ImageDto[];
}


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    slug!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    category_id!: number

    @IsString()
    @IsNotEmpty()
    shop_id!: string
}


export class createProductImgDto {
    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsString()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsNotEmpty()
    public_Id!: string;
}


export class createProductColorDto {
    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

}

export class createProductMaterialDto {
    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

}


export class createProductSizeDto {
    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}


export class createProductFeatureDto {
    @IsString()
    @IsNotEmpty()
    product_id!: string;

    @IsString()
    @IsNotEmpty()
    feature!: string;
}

export type FeatureItem = { value: string };



