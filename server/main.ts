import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { PrismaService } from './prisma/prisma.service';
import cookieParser from 'cookie-parser';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalFilters(new PrismaExceptionFilter());
    const prismaService = app.get(PrismaService);
    //close when program is ended
    await prismaService.enableShutdownHooks(app);
    const port = process.env.PORT;
    await app.listen(port || 3000);
    console.log(`Server is running on port ${port}`);
}

bootstrap();
