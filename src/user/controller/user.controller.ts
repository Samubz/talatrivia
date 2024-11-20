import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PermissionsMap } from '@src/auth/domain/permission.domain';
import { Permissions } from '@core/decorators/permissions.decorator';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '../service/user.service.interface';
import { UserControllerType } from './user.controller.type';
import { UserDomain } from '../domain/user.domain';

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
      permissions: domainElement?.permissions || [],
    };
  }
}
