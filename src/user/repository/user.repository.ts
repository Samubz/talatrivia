import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserDomain } from '../domain/user.domain';
import {
  FindUserByEmailResponse,
  IListUsersParams,
} from './user.repository.type';
import { CreateUserDto } from '../dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { ListUsersDTO } from '../dto/list-users.dto';
import { CONDITIONAL_EXIST } from '@core/constants/where-prisma.constants';
import { getPrevNextPagination } from '@core/utils/pagination-prev-next-response.util';
import { PaginationResponse } from '@core/interfaces/pagination-response.interface';
import { createInsensitiveSearch } from '@core/utils/create-insensitive-search.util';
import { ProfileDomain } from '../domain/profile.domain';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        ...CONDITIONAL_EXIST,
      },
      include: {
        profile: true,
      },
    });
    return this.toDomain(user);
  }

  async create(
    data: CreateUserDto,
    profile: ProfileDomain,
  ): Promise<UserDomain | null> {
    const { email, name, password, isActive } = data;

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        isActive,
        profileId: profile.id,
      },
    });
    return this.toDomain(createdUser);
  }

  async list(listUsersDto: ListUsersDTO): Promise<PaginationResponse> {
    const whereAndPagination =
      this.getWhereAndPaginationListUsers(listUsersDto);

    const [usersResponse, totalElements] = await Promise.all([
      this.prisma.user.findMany({ ...whereAndPagination }),
      this.prisma.user.count({ where: whereAndPagination.where }),
    ]);

    const users = usersResponse.map((user) =>
      this.toDomain(user),
    ) as UserDomain[];

    if (
      !whereAndPagination.take ||
      whereAndPagination.skip === undefined ||
      whereAndPagination.skip === null
    ) {
      return {
        users,
        totalElements,
        nextPage: null,
        prevPage: null,
      };
    }
    const { nextPage, prevPage } = getPrevNextPagination(
      whereAndPagination?.skip,
      whereAndPagination?.take,
      totalElements,
    );

    return {
      users,
      totalElements,
      nextPage,
      prevPage,
    };
  }

  async validateUserIds(userIds: string[]): Promise<boolean> {
    const usersCount = await this.prisma.user.count({
      where: {
        id: { in: userIds },
        ...CONDITIONAL_EXIST
      },
    });

    return userIds.length === usersCount;
  }

  getWhereAndPaginationListUsers(params: IListUsersParams) {
    const { name = '', page, limit } = params;

    const skipElements = page && limit ? (page - 1) * limit : undefined;

    const whereInput: Prisma.UserWhereInput = {
      ...CONDITIONAL_EXIST,
      ...(name.length && createInsensitiveSearch('name', name)),
    };
    const pagination: Prisma.UserFindManyArgs = {
      take: limit,
      skip: skipElements,
      where: whereInput,
      orderBy: {
        name: 'asc',
      },
      include: {
        profile: true,
      },
    };

    return pagination;
  }

  private toDomain(
    prismaUser: FindUserByEmailResponse | User | null,
  ): UserDomain | null {
    if (!prismaUser) return null;
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      isActive: prismaUser.isActive,
      profileId: prismaUser.profileId,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      deletedAt: prismaUser.deletedAt,
      permissions:
        (prismaUser as FindUserByEmailResponse).profile?.permissions || [],
      profile: (prismaUser as FindUserByEmailResponse).profile?.type,
    };
  }
}
