import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRegistrationService } from '@domain/users/services/user-registration.service';
import { UserModule } from '../users/user.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [UserRegistrationService],
  exports: [],
})
export class AuthModule {}
