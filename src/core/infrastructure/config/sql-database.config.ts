import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config/envs.config';

export const sqlDatabaseConfig = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    url: envs.database.url,
    entities: ['../domain/entities/**/*.entity.ts'],
    migrations: ['../domain/migrations/**/*.ts'],
    synchronize: true,
    autoLoadEntities: true,
  });
};
