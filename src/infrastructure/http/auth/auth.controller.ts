import { UserRegistrationService } from '@domain/users/services/user-registration.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
  ) {}
  // constructor(
  //   @Inject(UseCaseService)
  //   private readonly useCases: IUseCaseService,
  // ) {}
  // @Post('login')
  // login(@Body() credentials: LoginDto) {
  //   const response = this.useCases.login(
  //     credentials.email,
  //     credentials.password,
  //   );
  //   return response;
  // }

  @Post('register')
  register(@Body() payload: CreateAuthDto) {
    const user = this.userRegistrationService.execute(
      payload.name,
      payload.email,
      payload.password,
    );
    return user;
  }
  // @Post('refresh-token')
  // @UseGuards(AuthGuard('jwt-refresh'))
  // refreshToken(@GetUser() user: UserModel) {
  //   return this.useCases.refreshToken(user);
  // }
  // @Get('verify-token/:token')
  // verifyToken(@Param('token') token: string) {
  //   const response = this.useCases.verifyToken(token);
  //   return response
  //     ? { message: 'Token is valid' }
  //     : { message: 'Token is invalid' };
  // }
  // @Post('forgot-password')
  // forgotPassword(@Body() payload: ForgotPasswordDto) {
  //   this.useCases.forgotPassword(payload.email);
  //   return { message: 'Email sent' };
  // }
  // @Post('reset-password')
  // @UseGuards(AuthGuard('jwt-reset-password'))
  // resetPassword(@Body() payload: ResetPasswordDto, @GetUser() user: UserModel) {
  //   return this.useCases.resetPassword(user, payload.password);
  // }
  // @Post('change-password')
  // @Auth()
  // changePassword(
  //   @Body() payload: ChangePasswordDto,
  //   @GetUser() user: UserModel,
  // ) {
  //   return this.useCases.changePassword(user, payload);
  // }
  // @Post('verify-email')
  // @UseGuards(AuthGuard('jwt-reset-password'))
  // verifyEmail(@GetUser() user: UserModel) {
  //   if (user.isVerified) {
  //     throw new BadRequestException('Email already verified');
  //   }
  //   return this.useCases.verifyEmail(user);
  // }
  // @Post('resend-verification-email')
  // @Auth()
  // resendVerificationEmail(@GetUser() user: UserModel) {
  //   if (user.isVerified) {
  //     throw new BadRequestException('Email already verified');
  //   }
  //   return this.useCases.resendVerificationEmail(user.email);
  // }
}
