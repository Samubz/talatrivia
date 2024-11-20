import { ProfileDomain } from "../domain/profile.domain";
import { ProfileTypeDomain } from "../domain/role.domain";

export interface IProfileRepository {
    getByType(type: ProfileTypeDomain): Promise<ProfileDomain | null>;
}

export const PROFILE_REPOSITORY_TOKEN = 'PROFILE_REPOSITORY';
