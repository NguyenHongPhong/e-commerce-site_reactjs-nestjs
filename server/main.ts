import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    const port = process.env.PORT;
    await app.listen(port || 3000);
    console.log(`Server is running on port ${port}`);
}

bootstrap();
