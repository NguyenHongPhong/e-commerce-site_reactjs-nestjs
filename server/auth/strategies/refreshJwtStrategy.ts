import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Config lớp refresh token để khi các request được gửi tới thông qua lớp này refresh Token sẽ được kiểm tra
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: any) => req?.cookies?.['refreshToken'] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        });
    }
    async validate(req: any) {
        return { userId: req.sub, role: req.role };
    }
}
