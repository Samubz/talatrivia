import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserDomain } from '../domain/user.domain';
import { FindUserByEmailResponse } from './user.repository.type';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  IProfileRepository,
  PROFILE_REPOSITORY_TOKEN,
} from './profile.repository.interface';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(PROFILE_REPOSITORY_TOKEN)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
    return this.toDomain(user);
  }

  async create(data: CreateUserDto): Promise<UserDomain | null> {
    const { email, name, password, isActive, profileType } = data;
    const profile = await this.profileRepository.getByType(profileType);
    if (!profile) {
      throw new Error(ResponseErrorMessage.PROFILE_NOT_FOUND);
    }
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
    };
  }
}
