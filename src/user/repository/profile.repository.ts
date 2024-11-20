import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { IProfileRepository } from './profile.repository.interface';
import { ProfileDomain } from '../domain/profile.domain';
import { Profile } from '@prisma/client';
import { ProfileTypeDomain } from '../domain/role.domain';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByType(type: ProfileTypeDomain): Promise<ProfileDomain | null> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        type,
      },
    });
    return this.toDomain(profile);
  }

  private toDomain(prismaElement: Profile | null): ProfileDomain | null {
    if (!prismaElement) return null;
    return {
      id: prismaElement.id,
      name: prismaElement.name,
      type: prismaElement.type,
      permissions: prismaElement.permissions || [],
    };
  }
}
