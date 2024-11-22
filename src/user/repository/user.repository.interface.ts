import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { UserDomain } from '../domain/user.domain';
import { CreateUserDto } from '../dto/create-user.dto';
import { ListUsersDTO } from '../dto/list-users.dto';
import { ProfileDomain } from '../domain/profile.domain';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDomain | null>;
  create(
    data: CreateUserDto,
    profile: ProfileDomain,
  ): Promise<UserDomain | null>;
  list(listUsersDto: ListUsersDTO): Promise<PaginationResponse>;
  validateUserIds(ids: string[]): Promise<boolean>;
  getUsers(ids: string[]): Promise<UserDomain[]>;
}

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
