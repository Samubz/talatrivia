import { Injectable, Inject } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.request.dto';
import {
  IUserService,
  USER_SERVICE_TOKEN,
} from '@src/user/service/user.service.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDomain } from '@src/user/domain/user.domain'; 

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(loginDto: LoginRequestDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = this.generateToken(user);
    return { token };
  }
  private generateToken = ({ id, name, email }: UserDomain) => {
    return this.jwtService.sign({
      id,
      name,
      email,
    });
  };
}