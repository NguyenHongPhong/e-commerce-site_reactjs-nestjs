import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { OtpModule } from './otp/otp.module';
import { CategoryModule } from './category/category.module';
import { CategoryImagesModule } from './category_images/category_images.module';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { MaterialModule } from './material/material.module';
import { SizeModule } from './size/size.module';
import { ProductImgModule } from './product_img/product.img.module';
import { ShopperModule } from './shopper/shopper.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        UserModule,
        AuthModule,
        OtpModule,
        CategoryModule,
        CategoryImagesModule,
        ProductModule,
        ColorModule,
        MaterialModule,
        SizeModule,
        ProductImgModule,
        ShopperModule
    ],
    controllers: [AppController],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class AppModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(AuthMiddleware)
    //         .forRoutes({ path: '', method: RequestMethod.GET });
    // }
}
