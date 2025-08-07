import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const a = createUserDto;
        return await this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }
}
