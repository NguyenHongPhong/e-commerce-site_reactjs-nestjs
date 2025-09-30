import { Controller, Post, Body, UploadedFiles, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ShopperService } from './shopper.service';
import { MulterUploadOptions } from '@/config/cloudinary.config';
import { ShopperDTO } from './dto';

@Controller('shoppers')
export class ShopperController {
    constructor(private readonly shopperService: ShopperService) { }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'logo', maxCount: 1 },
                { name: 'banner', maxCount: 1 },
            ],
            MulterUploadOptions
        )
    )
    // Lưu ý khi đăng ký shopper thì chỉ gửi thông tin xác nhận cho admin thôi, chứ chưa trở thành shopper chính thức
    // Vì chưa xây dựng module admin nên không thể xác nhận được
    async register(
        @UploadedFiles() files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
        @Body('data') data: string,
        @Req() req: any,
    ) {
        const { userId } = req.user;
        const shopperDto: ShopperDTO = JSON.parse(data);
        const logoFile = files.logo?.[0];
        const bannerFile = files.banner?.[0];

        return this.shopperService.create(shopperDto, logoFile, bannerFile, userId);
    }
}
