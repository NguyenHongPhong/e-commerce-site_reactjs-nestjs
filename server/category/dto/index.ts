// create-category.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsOptional()
    @IsString()
    parentId?: string;
}


export type getCategoriesWithImgs = {
    categoryId: string,
    imgs: {
        url: string,
        publicId: string,
        main: Boolean
    }
}
