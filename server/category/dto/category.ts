import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

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

    @IsString()
    id_shop!: string; // <-- thêm field này
}

