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
import {
  IProfileRepository,
  PROFILE_REPOSITORY_TOKEN,
} from '../repository/profile.repository.interface';
import { UserDomain } from '../domain/user.domain';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(PROFILE_REPOSITORY_TOKEN)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create(data: CreateUserDto) {
    const { password, profileType } = data;
    const profile = await this.profileRepository.getByType(profileType);
    if (!profile) {
      throw new Error(ResponseErrorMessage.PROFILE_NOT_FOUND);
    }
    const hashPassword = await this.hashPassword(password);
    return this.userRepository.create(
      {
        ...data,
        password: hashPassword,
      },
      profile,
    );
  }

  async getUsers(ids: string[]): Promise<UserDomain[]> {
      return this.userRepository.getUsers(ids);
  }

  async list(listUsersDto: ListUsersDTO) {
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
