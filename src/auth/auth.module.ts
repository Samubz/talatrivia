import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserModule } from '@src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth-jwt.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.tokenExpiresIn },
    }),
  ],
})
export class AuthModule {}
