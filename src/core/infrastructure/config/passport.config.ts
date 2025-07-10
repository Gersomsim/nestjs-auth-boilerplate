import { PassportModule } from '@nestjs/passport';

export const passportConfig = () => {
  return PassportModule.register({
    defaultStrategy: 'jwt',
  });
};
