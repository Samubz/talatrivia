import { UserDomain } from '../domain/user.domain';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDomain | null>;
}

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';
