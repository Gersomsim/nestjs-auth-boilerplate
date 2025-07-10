import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs.config';

export const jwtConfig = () => {
  return JwtModule.register({
    global: true,
    secret: envs.jwt.secret,
    signOptions: {
      expiresIn: `${envs.jwt.expiration}s`,
    },
  });
};
