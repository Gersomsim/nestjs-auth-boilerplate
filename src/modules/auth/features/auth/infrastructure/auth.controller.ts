import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../application/auth.service';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserModel } from '../../user/domain/models/user.model';
import { GetUser } from 'src/modules/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly repository: AuthRepository,
  ) {}

  @Post('login')
  login(@Body() credentials: LoginDto) {
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
  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@GetUser() user: UserModel) {
    return this.repository.refreshToken(user);
  }
  @Get('verify-token/:token')
  verifyToken(@Param('token') token: string) {
    const response = this.repository.verifyToken(token);
    return response
      ? { message: 'Token is valid' }
      : { message: 'Token is invalid' };
  }
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    this.repository.forgotPassword(payload.email);
    return { message: 'Email sent' };
  }
}
