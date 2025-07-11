import { Module } from '@nestjs/common';
import { UseCaseService } from './application/use-case.service';
import { AuthController } from './infrastructure/auth.controller';
import { UserRepository } from '../user/domain/repository/user.repository';
import { OrmUserRepository } from '@application/repositories';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/entities';
import { JwtRefreshStrategy } from './application/strategies/jwt-refresh.strategy';
import { JwtResetPasswordStrategy } from './application/strategies/jwt-reset-password.strategy';
import { AuthRepository } from './domain/repositories/auth.repository';
import { OrmAuthRepository } from '@application/repositories/modules/auth/orm-auth.repository';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    JwtStrategy,
    JwtRefreshStrategy,
    JwtResetPasswordStrategy,
    UseCaseService,
    UserRepository,
    OrmUserRepository,
    AuthRepository,
    OrmAuthRepository,
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
