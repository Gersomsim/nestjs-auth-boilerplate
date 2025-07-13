import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/http/filters/http-exeption.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './infrastructure/http/interceptors/response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/databases/typeorm/user/entities/user.entity';
import { envs } from './config/envs.config';
import { AuthModule } from '@infrastructure/http/auth/auth.module';
import { UserModule } from '@infrastructure/http/users/user.module';
import { MailModule } from '@infrastructure/mails/mail.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: 'default', ttl: envs.throttle.ttl, limit: envs.throttle.limit },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    MailModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
