import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../application/auth.service';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly repository: AuthRepository,
  ) {}

  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    const response = this.repository.login(
      credentials.email,
      credentials.password,
    );
    return response;
  }

  @Post('register')
  register(@Body() payload: CreateAuthDto) {
    const response = this.repository.register(payload);
    return response;
  }
}
