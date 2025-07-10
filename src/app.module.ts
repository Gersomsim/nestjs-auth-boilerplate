import { RateLimit } from '@infrastructure/config/rate-limit.config';
import { Module } from '@nestjs/common';
import { MainAuthModule } from './modules';
import { sqlDatabaseConfig } from '@infrastructure/index';
import { jwtConfig } from '@infrastructure/config/jwt.config';
import { passportConfig } from '@infrastructure/config/passport.config';

@Module({
  imports: [
    jwtConfig(),
    passportConfig(),
    RateLimit(),
    sqlDatabaseConfig(),
    MainAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
