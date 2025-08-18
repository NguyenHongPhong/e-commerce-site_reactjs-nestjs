import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { PrismaService } from './prisma/prisma.service';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    });
    app.use(cookieParser());
    //It validates incoming request data(e.g. @Body(), @Query(), @Param()) against your DTO(Data Transfer Object) classes.
    //If the data doesn’t match the DTO rules, NestJS throws an error before it even hits your controller.
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new PrismaExceptionFilter());
    const prismaService = app.get(PrismaService);
    //close when program is ended
    await prismaService.enableShutdownHooks(app);
    const port = process.env.PORT;
    await app.listen(port || 3000);
    console.log(`Server is running on port ${port}`);
}

bootstrap();
