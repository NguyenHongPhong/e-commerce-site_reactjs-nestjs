import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Config lớp jwt để khi các request được gửi tới thông qua lớp này token sẽ được kiểm tra
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, iat: payload.iat };
    }
}

