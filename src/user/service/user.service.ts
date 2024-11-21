import { Injectable, Inject } from '@nestjs/common';
import { IUserService } from './user.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../repository/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_BCRYPT } from '@src/auth/constants/bcrypt.constants';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { ListUsersDTO } from '../dto/list-users.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(data: CreateUserDto) {
    const {password} = data;
    const hashPassword = await this.hashPassword(password);
    return this.userRepository.create({
      ...data,
      password: hashPassword,
    });
  }

  async list(listUsersDto: ListUsersDTO){
    return this.userRepository.list(listUsersDto);
  }

  private async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, PASSWORD_SALT_BCRYPT);
    } catch (error) {
      throw new Error(ResponseErrorMessage.ERROR_CREATING_PASSWORD);
    }
  }
}
