import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateAuthDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from './dto';
import {
  LoginUserHandler,
  RefreshTokenHandler,
  RegisterUserHandler,
  ResendEmailVerificationHandler,
  VerifyUserHandler,
  VerifyTokenHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
} from '@application/auth/services';
import { User } from '@domain/users/entities/user.entity';
import {
  ForgotPasswordCommand,
  LoginCommand,
  RefreshTokenCommand,
  RegisterUserCommand,
  ResendEmailVerificationCommand,
  UserVerifyCommand,
  VerifyTokenCommand,
  ResetPasswordCommand,
} from '@application/auth/commands';
import { Auth, GetUser } from '../decorators';
import { Response } from '../utils/response.util';
import { VerifyEmailQueriesDto } from './dto/verify-email-queries.dto';
import { LoginResponseDto, UserDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserHandler: LoginUserHandler,
    private readonly verifyUserHandler: VerifyUserHandler,
    private readonly verifyTokenHandler: VerifyTokenHandler,
    private readonly refreshTokenHandler: RefreshTokenHandler,
    private readonly registerUserHandler: RegisterUserHandler,
    private readonly resetPasswordHandler: ResetPasswordHandler,
    private readonly forgotPasswordHandler: ForgotPasswordHandler,
    private readonly resendEmailVerificationHandler: ResendEmailVerificationHandler,
  ) {}
  @ApiOperation({
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials',
  })
  @ApiUnauthorizedResponse({
    description: 'User inactive',
  })
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    const command = new LoginCommand(credentials.email, credentials.password);
    const response = await this.loginUserHandler.execute(command);
    return Response.success(response);
  }

  @ApiOperation({
    summary: 'Refresh token',
  })
  @ApiBearerAuth('refresh-token')
  @ApiOkResponse({
    description: 'Request successful',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
  })
  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@GetUser() user: User) {
    const command = new RefreshTokenCommand(
      user.Id,
      user.Name,
      user.Email,
      user.IsVerified,
      user.IsActive,
    );
    return Response.success(this.refreshTokenHandler.execute(command));
  }

  @ApiOperation({
    summary: 'Register user',
  })
  @ApiOkResponse({
    description: 'User registered successfully',
    type: LoginResponseDto,
  })
  @ApiConflictResponse({
    description: 'Email already in use',
  })
  @Post('register')
  async register(@Body() payload: CreateAuthDto) {
    const command = new RegisterUserCommand(
      payload.email,
      payload.password,
      payload.name,
    );
    const response = await this.registerUserHandler.execute(command);
    return Response.success(response, 'User registered successfully');
  }

  @ApiOperation({
    summary: 'Resend verification email',
  })
  @ApiOkResponse({
    description: 'Verification email sent successfully',
  })
  @ApiBadRequestResponse({
    description: 'Email already verified',
  })
  @ApiBearerAuth('jwt-auth')
  @Post('resend-verification-email')
  @Auth()
  async resendVerificationEmail(@GetUser() user: User) {
    if (user.IsVerified) {
      throw new BadRequestException('Email already verified');
    }
    const command = new ResendEmailVerificationCommand(user.Id, user.Email);
    await this.resendEmailVerificationHandler.execute(command);

    return Response.success('', 'Verification email sent successfully');
  }

  @ApiOperation({
    summary: 'Verify email',
  })
  @ApiOkResponse({
    description: 'Email verified successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token',
  })
  @Get('verify-email')
  async verifyEmail(@Query() queries: VerifyEmailQueriesDto) {
    if (!queries.token) {
      return Response.success('');
    }
    const command = new UserVerifyCommand(queries.token);
    await this.verifyUserHandler.execute(command);
    return Response.success('', 'Email verified successfully');
  }

  @ApiOperation({
    summary: 'Verify token',
  })
  @ApiOkResponse({
    description: 'Token is valid',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token',
  })
  @ApiUnauthorizedResponse({
    description: 'Token expired',
  })
  @ApiUnauthorizedResponse({
    description: 'User inactive',
  })
  @Get('verify-token/:token')
  async verifyToken(@Param('token') token: string) {
    const command = new VerifyTokenCommand(token);
    const user = await this.verifyTokenHandler.execute(command);
    return Response.success(user, 'Token is valid');
  }

  @ApiOperation({
    summary: 'Forgot password',
  })
  @ApiOkResponse({
    description: 'Email sent',
  })
  @ApiBadRequestResponse({
    description: 'Email not found',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'User inactive',
  })
  @Post('forgot-password')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    const command = new ForgotPasswordCommand(payload.email);
    await this.forgotPasswordHandler.execute(command);
    return Response.success('', 'Email sent');
  }

  @ApiOperation({
    summary: 'Reset password',
  })
  @ApiOkResponse({
    description: 'Password reset successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token',
  })
  @ApiUnauthorizedResponse({
    description: 'Token expired',
  })
  @ApiBearerAuth('forgot-password-token')
  @Post('reset-password')
  @UseGuards(AuthGuard('jwt-reset-password'))
  async resetPassword(
    @Body() payload: ResetPasswordDto,
    @GetUser() user: User,
  ) {
    const command = new ResetPasswordCommand(
      payload.password,
      user.Id,
      user.Email,
      user.Name,
      user.IsVerified,
      user.IsActive,
    );
    await this.resetPasswordHandler.execute(command);
    return Response.success('', 'Password reset successfully');
  }
}
