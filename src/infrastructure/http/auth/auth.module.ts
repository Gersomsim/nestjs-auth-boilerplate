import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { forwardRef } from '@nestjs/common';
import {
  LoginUserHandler,
  RefreshTokenHandler,
  RegisterUserHandler,
  ResendEmailVerificationHandler,
  ResetPasswordHandler,
  VerifyTokenHandler,
  VerifyUserHandler,
} from '@application/auth/services';
import { JwtTokenProvider } from '@infrastructure/di';
import {
  JwtRefreshTokenStrategy,
  JwtResetPasswordStrategy,
  JwtStrategy,
} from '@infrastructure/auth/strategies';
import { JwtAdapter } from '@infrastructure/auth/adapters/jwt.adapter';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs.config';
import { MailModule } from '@infrastructure/mails/mail.module';
import { TypeormUserRepository } from '@infrastructure/databases/typeorm/user/repositories/typeorm-user.repository';
import { ForgotPasswordHandler } from '@application/auth/services/forgot-password.handler';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: envs.jwt.expiration,
      },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => MailModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserHandler,
    LoginUserHandler,
    JwtTokenProvider,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtResetPasswordStrategy,
    JwtAdapter,
    ResendEmailVerificationHandler,
    TypeormUserRepository,
    VerifyUserHandler,
    RefreshTokenHandler,
    VerifyTokenHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
  ],
  exports: [],
})
export class AuthModule {}
