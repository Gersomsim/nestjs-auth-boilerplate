import { Module } from '@nestjs/common';
import { RateLimit } from '@infrastructure/config/rate-limit.config';
import { MainAuthModule } from './modules';

@Module({
  imports: [MainAuthModule, RateLimit()],
  controllers: [],
  providers: [],
})
export class AppModule {}
