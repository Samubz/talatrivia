import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PermissionsMap } from '@src/auth/domain/permission.domain';
import { Permissions } from '@core/decorators/permissions.decorator';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../service/user.service.interface';
import { UserControllerType } from './user.controller.type';
import { UserDomain } from '../domain/user.domain';
import { ListUsersDTO } from '../dto/list-users.dto';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
  ) {}

  @Permissions(PermissionsMap.CREATE_USER)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserControllerType | null> {
    const user = await this.userService.create(createUserDto);
    return this.toController(user);
  }

  @Permissions(PermissionsMap.LIST_USERS)
  @Get()
  async get(@Query() listUsersDto: ListUsersDTO): Promise<PaginationResponse> {
    const paginationResponse = await this.userService.list(listUsersDto);
    const { users: userResponse, ...rest } = paginationResponse;
    const users = (userResponse as UserDomain[]).map((user) =>
      this.toController(user),
    ) as UserControllerType[];
    return {
      users,
      ...rest,
    };
  }

  private toController(
    domainElement: UserDomain | null,
  ): UserControllerType | null {
    if (!domainElement) return null;
    return {
      id: domainElement.id,
      name: domainElement.name,
      email: domainElement.email,
      isActive: domainElement.isActive,
      profileId: domainElement.profileId,
      createdAt: domainElement.createdAt,
      updatedAt: domainElement.updatedAt,
      deletedAt: domainElement.deletedAt,
    };
  }
}
