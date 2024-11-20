// This section contains repository types
import { Prisma, User } from '@prisma/client';

export type FindUserByEmailResponse = User &
  Prisma.UserGetPayload<{
    
    include: {
      profile: true,
    },
  }>;
