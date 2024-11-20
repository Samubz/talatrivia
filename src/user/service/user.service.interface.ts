import { UserDomain } from '../domain/user.domain'; 

export interface IUserService { 
  findByEmail(email: string): Promise<UserDomain|null>;
}

export const USER_SERVICE_TOKEN = 'USER_SERVICE';