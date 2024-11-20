import { Public } from '@core/decorators/public-route.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.request.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginRequestDto): Promise<{ token: string }> {
    return this.authService.signIn(loginDto);
  }
}
