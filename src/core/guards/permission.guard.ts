import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@core/constants/permissions.constants';
import { PermissionInputType } from '@core/decorators/permissions.decorator';
import { ISession } from '@src/auth/domain/token-payload.domain';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private hasRequiredPermissions(
    requiredPermissions: PermissionInputType,
    session: ISession,
  ) {
    const { permissions } = session;
    return requiredPermissions.some((permission) =>
      permissions?.includes(permission),
    );
  }
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions =
      this.reflector.getAllAndOverride<PermissionInputType>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!requiredPermissions) {
      return true;
    }
    const { session } = context.switchToHttp().getRequest();
    return this.hasRequiredPermissions(requiredPermissions, session);
  }
}
