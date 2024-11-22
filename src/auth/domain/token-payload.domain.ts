import { ProfileTypeDomain } from "@src/user/domain/role.domain";

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  profile: ProfileTypeDomain;
}

export interface ISession extends JWTPayload {}