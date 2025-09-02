import { Controller, Res, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IResetPasswordUserDto } from './dto/reset-password-user.dto';
import { Response } from 'express';
import { CurrentUser } from '../common/types/currentUser';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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


    @Post("reset-password")
    async resetPassword(@Body() data: IResetPasswordUserDto) {
        return this.userService.updateNewPasswordByEmail(data);
    }

    //Authenticate router
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@CurrentUser() user: any) {
        return this.userService.getProfile(user.userId);
    }

}
