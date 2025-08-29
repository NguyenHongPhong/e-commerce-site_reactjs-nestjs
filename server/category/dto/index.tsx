// import { IsString, IsOptional, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
// import { Type } from 'class-transformer';

// export class CreateCategoryDto {
//     @IsString()
//     @IsNotEmpty()
//     name: string;

//     @IsString()
//     @IsOptional()
//     description?: string;

//     // In DTO we don’t keep FileList directly;
//     // client usually sends multipart/form-data and
//     // NestJS handles files with @UploadedFiles
//     @IsArray()
//     @IsOptional()
//     images?: string[]; // you can map FileList → string[] (urls or filenames)

//     @IsNumber()
//     @Type(() => Number) // ensures parent_id converts from string → number
//     @IsOptional()
//     parent_id?: number;
// }
