import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envs } from './config/envs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.swagger.version,
  });
  const document = SwaggerModule.createDocument(app, {
    openapi: '3.0.0',
    info: {
      title: envs.swagger.title,
      version: envs.swagger.version,
    },
    components: {
      securitySchemes: {
        'jwt-auth': {
          type: 'http',
          scheme: 'bearer',
        },
        'refresh-token': {
          type: 'http',
          scheme: 'bearer',
        },
        'forgot-password-token': {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.api.port, () => {
    console.log(`Server is running on port ${envs.api.port}`);
  });
}
bootstrap();
