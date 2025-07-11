import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDI } from '@infrastructure/di';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@infrastructure/databases/typeorm/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserDI],
  exports: [UserDI, TypeOrmModule],
})
export class UserModule {}
