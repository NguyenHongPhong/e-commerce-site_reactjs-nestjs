import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // giúp dùng ở mọi nơi không cần import lại
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
