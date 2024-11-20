import { UserDomain } from '../domain/user.domain';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDomain | null>;
  create(data: CreateUserDto): Promise<UserDomain | null>;
}

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
