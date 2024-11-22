import { ConfigService } from '@nestjs/config';
const configService: ConfigService = new ConfigService();

export const jwtConstants = {
  secret: configService.getOrThrow<string>('JWT_SECRET'),
  tokenExpiresIn: configService.getOrThrow<string>('JWT_TOKEN_EXPIRES_IN'),
  refreshTokenExpiresIn: configService.getOrThrow<string>(
    'JWT_REFRESH_TOKEN_EXPIRES_IN',
  ),
};
