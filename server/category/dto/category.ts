import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
export type categoryDto = {
    name: string;
    description: string;
    parentId?: string | undefined;
}


export class CreateCategoryDto {
    @IsString()
    name!: string;

    @IsString()
    slug!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    parent_id?: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

