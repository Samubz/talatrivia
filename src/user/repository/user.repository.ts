import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { User as PrismaUser } from '@prisma/client'; // Usa los tipos generados por Prisma
import { PrismaService } from '@src/prisma/prisma.service';
import { UserDomain } from '../domain/user.domain';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return this.toDomain(user);
  }

  private toDomain(prismaUser: PrismaUser | null): UserDomain | null {
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
    };
  }
}
