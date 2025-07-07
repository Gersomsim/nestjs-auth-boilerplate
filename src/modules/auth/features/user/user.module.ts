import { Module } from '@nestjs/common';
import { OrmUserRepository } from '@application/repositories/modules/auth/orm-user.reporitory';
import { UserRepository } from './domain/repository/user.repository';
import { UserUseCaseService } from './application/user.use-case.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OrmUserRepository, UserRepository, UserUseCaseService],
})
export class UserModule {}
