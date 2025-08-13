import { Controller, Res, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { IJwtPayload } from '../common/types';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            await this.userService.create(createUserDto);
            return res.json({
                message: 'Register successfully !!!'
            });

        } catch (error) {
            return res.json({
                message: 'Register failed !!!'
            });

        }
    }

    @Get("me")
    async getProfile(@Req() req: Request, res: Response) {
        const token = req.cookies['accessToken'];
        const payload = this.userService.verifyJwtToken(token) as IJwtPayload;
        if (!payload.sub) {
            throw new Error('Invalid token: missing userId');
        }
        const userId = payload.sub;

        const profile = await this.userService.findById(userId);
        if (profile) {
            const { created_at, email_verified_at, isShop, last_login_at, password, provider, providerId, status_id, updated_at, ...userInformation } = profile;
            return userInformation;
        }
    }

}
