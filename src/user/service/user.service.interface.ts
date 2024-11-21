import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { UserDomain } from '../domain/user.domain';
import { CreateUserDto } from '../dto/create-user.dto';
import { ListUsersDTO } from '../dto/list-users.dto';

export interface IUserService {
  findByEmail(email: string): Promise<UserDomain | null>;
  create(data: CreateUserDto): Promise<UserDomain | null>;
  list(listUsersDto: ListUsersDTO): Promise<PaginationResponse>;
}

export const USER_SERVICE_TOKEN = 'USER_SERVICE';
