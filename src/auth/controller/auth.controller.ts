import { Public } from '@core/decorators/public-route.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.request.dto';
import { AuthService } from '../service/auth.service';
import { validateErrors } from '@core/utils/http-error-response.util';
import { ResponseErrorMessage } from '../constants/response-message.constants';
import { PromiseResponse } from '@core/types/promise';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() loginDto: LoginRequestDto,
  ): PromiseResponse<{ accessToken: string }> {
    try {
      return this.authService.signIn(loginDto);
    } catch (error) {
      validateErrors(error, AuthController.name, ResponseErrorMessage);
    }
  }
}
