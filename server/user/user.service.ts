import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_STATUS } from '../constants/app.constant';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async create(data: CreateUserDto) {
        let defaultData = { ...data, status_id: USER_STATUS.active };
        const isUsername = await this.userRepository.findByEmailOrUserName(defaultData.email, defaultData.username);
        if (isUsername) {
            throw new ConflictException('Email or username already exists');
        };

        return this.userRepository.createUser(defaultData);
    }
}
