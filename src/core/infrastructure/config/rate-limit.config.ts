import { ThrottlerModule } from '@nestjs/throttler';

export const RateLimit = () => {
  return ThrottlerModule.forRoot([
    {
      ttl: 60000,
      limit: 10,
      ignoreUserAgents: [/postman/i, /curl/i, /insomnia/i],
    },
  ]);
};
