import { UserDomain } from '../domain/user.domain';

export type UserControllerType = Omit<UserDomain, 'password'>;
