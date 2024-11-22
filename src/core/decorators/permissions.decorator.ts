import { PERMISSIONS_KEY } from '@core/constants/permissions.constants';
import { SetMetadata } from '@nestjs/common'; 
import { PermissionsDomain } from '@src/auth/domain/permission.domain';

export type PermissionInputType = Array<PermissionsDomain>;
export const Permissions = (...permissions: PermissionInputType) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
