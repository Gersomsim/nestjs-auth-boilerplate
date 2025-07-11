import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseService, IUseCaseService } from '../application';
import { UserModel } from '../../user/domain/models/user.model';
import { Auth, GetUser } from 'src/modules/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateAuthDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from './dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCaseService)
    private readonly useCases: IUseCaseService,
  ) {}

  @Post('login')
  login(@Body() credentials: LoginDto) {
    const response = this.useCases.login(
      credentials.email,
      credentials.password,
    );
    return response;
  }

  @Post('register')
  register(@Body() payload: CreateAuthDto) {
    const response = this.useCases.register(payload);
    return response;
  }
  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@GetUser() user: UserModel) {
    return this.useCases.refreshToken(user);
  }
  @Get('verify-token/:token')
  verifyToken(@Param('token') token: string) {
    const response = this.useCases.verifyToken(token);
    return response
      ? { message: 'Token is valid' }
      : { message: 'Token is invalid' };
  }
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    this.useCases.forgotPassword(payload.email);
    return { message: 'Email sent' };
  }
  @Post('reset-password')
  @UseGuards(AuthGuard('jwt-reset-password'))
  resetPassword(@Body() payload: ResetPasswordDto, @GetUser() user: UserModel) {
    return this.useCases.resetPassword(user, payload.password);
  }
  @Post('change-password')
  @Auth()
  changePassword(
    @Body() payload: ChangePasswordDto,
    @GetUser() user: UserModel,
  ) {
    return this.useCases.changePassword(user, payload);
  }
  @Post('verify-email')
  @UseGuards(AuthGuard('jwt-reset-password'))
  verifyEmail(@GetUser() user: UserModel) {
    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }
    return this.useCases.verifyEmail(user);
  }
  @Post('resend-verification-email')
  @Auth()
  resendVerificationEmail(@GetUser() user: UserModel) {
    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }
    return this.useCases.resendVerificationEmail(user.email);
  }
}
