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
