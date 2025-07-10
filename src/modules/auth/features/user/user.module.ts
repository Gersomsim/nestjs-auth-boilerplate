import { OrmUserRepository } from '@application/repositories/modules/auth/orm-user.reporitory';
import { Module } from '@nestjs/common';
import { UserUseCaseService } from './application/user.use-case.service';
import { UserRepository } from './domain/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/entities';
import { UserController } from './infrastructure/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, UserUseCaseService, OrmUserRepository],
})
export class UserModule {}
