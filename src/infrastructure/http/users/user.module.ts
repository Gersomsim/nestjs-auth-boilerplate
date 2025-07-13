import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserTokenProvider } from '@infrastructure/di';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/databases/typeorm/user/entities/user.entity';
import {
  ActiveUserHandler,
  GetAllUsersHandler,
  GetUserByIdHandler,
} from '@application/users/services';
import { ChangeUserPasswordHandler } from '@application/users/services/change-user-password.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserTokenProvider,
    GetUserByIdHandler,
    ChangeUserPasswordHandler,
    GetAllUsersHandler,
    ActiveUserHandler,
  ],
  exports: [UserTokenProvider, TypeOrmModule],
})
export class UserModule {}
