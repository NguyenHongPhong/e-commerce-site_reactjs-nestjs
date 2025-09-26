// import { Controller, Post, Body, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
// import { ShopperService } from './shopper.service';
// import { MulterUploadOptions } from '@/config/cloudinary.config';
// import { ShopperDTO } from './dto';

// @Controller('shoppers')
// export class ShopperController {
//     constructor(private readonly shopperService: ShopperService) { }

//     @UseGuards(JwtAuthGuard)
//     @Post('register')
//     @UseInterceptors(
//         FileFieldsInterceptor(
//             [
//                 { name: 'logo', maxCount: 1 },
//                 { name: 'banner', maxCount: 1 },
//             ],
//             MulterUploadOptions
//         )
//     )
//     async register(
//         @UploadedFiles() files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
//         @Body('data') data: string,
//     ) {
//         // parse JSON thành DTO
//         const shopperDto: ShopperDTO = JSON.parse(data);

//         // tách file
//         const logoFile = files.logo?.[0];
//         const bannerFile = files.banner?.[0];

//         // gọi service
//         return this.shopperService.create(shopperDto, logoFile, bannerFile);
//     }
// }
