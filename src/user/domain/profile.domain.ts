import { ProfileTypeDomain } from './role.domain';

export class ProfileDomain {
  id: string;
  name: string;
  type: ProfileTypeDomain;
  permissions: string[];
}
