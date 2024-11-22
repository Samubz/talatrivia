import { ProfileTypeDomain } from '@src/user/domain/role.domain';

export const profileIsAdmin = (profile: ProfileTypeDomain) =>
  profile === 'ADMIN';
