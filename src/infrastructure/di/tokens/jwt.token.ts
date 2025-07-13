import { JwtAdapter } from '@infrastructure/auth/adapters/jwt.adapter';

export const JwtToken = 'JwtToken';

export const JwtTokenProvider = {
  provide: JwtToken,
  useClass: JwtAdapter,
};
