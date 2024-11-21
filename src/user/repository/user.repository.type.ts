// This section contains repository types
import { Prisma, User } from '@prisma/client';
import { ProfileTypeDomain } from '../domain/role.domain';

export type FindUserByEmailResponse = User &
  Prisma.UserGetPayload<{
    
    include: {
      profile: true,
    },
  }>;

  export interface IListUsersParams {
    name?: string;
    profileType?: ProfileTypeDomain
    page?: number;
    limit?: number;
  }
  