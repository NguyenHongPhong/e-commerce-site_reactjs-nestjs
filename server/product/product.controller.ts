import {
    Controller,
    Post,
    Body,
    UploadedFiles,
    UseInterceptors,
    Get
} from '@nestjs/common';


@Controller('product')
export class ProductController {
    constructor() { }

    @Post('create')
    create() { }

    @Get('getAll')
    getCategories() { }

}
