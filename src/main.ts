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
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.api.version,
  });
  const document = SwaggerModule.createDocument(app, {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
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
