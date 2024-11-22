import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { TokenExpiredError } from '@nestjs/jwt';
  import { Request } from 'express';   
  import { Reflector } from '@nestjs/core';
  import { IS_PUBLIC_KEY } from '@core/constants/public-route.constants';  
import { ResponseErrorMessage } from '@src/auth/constants/response-message.constants';
import { HttpErrorException } from '@core/exceptions/http-error.exception';
import { AuthService } from '@src/auth/service/auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private authService: AuthService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (isPublic) {
        return true;
      }
  
      try {
        const { token, request } = this.getToken(context);
        request['session'] = this.authService.validateToken(
          token
        );
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          this.handleTokenExpiredError();
        } else {
          this.handleUnauthorizedError();
        }
      }
      return true;
    }
  
    private handleTokenExpiredError(): never {
      throw new HttpErrorException(
        new UnauthorizedException(ResponseErrorMessage.JWT_TOKEN_EXPIRED),
        {
          source: AuthGuard.name,
        },
      );
    }
  
    private handleUnauthorizedError(): never {
      throw new HttpErrorException(new UnauthorizedException(), {
        source: AuthGuard.name,
      });
    }
  
    private getToken(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new Error();
      }
  
      return { token, request };
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  