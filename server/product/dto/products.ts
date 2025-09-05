import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
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

