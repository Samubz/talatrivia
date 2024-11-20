import { Injectable, Inject } from '@nestjs/common';
import { IUserService } from './user.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '../repository/user.repository.interface';
import { UserDomain } from '../domain/user.domain';
import { CreateUserDto } from '../dto/create-user.dto';

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
    return this.userRepository.create(data);
  }
}
