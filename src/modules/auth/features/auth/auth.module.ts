import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/auth.controller';
import { UserRepository } from '../user/domain/repository/user.repository';
import { OrmUserRepository } from '@application/repositories';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/entities';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserRepository, OrmUserRepository, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
