import { JwtPayload } from '@infrastructure/interfaces/jwt-payload.interface';

export interface IJwtService {
  generateToken(id: string): string;
  verifyToken(token: string): Promise<JwtPayload>;
  generateRefreshToken(id: string): string;
  generateResetPasswordToken(id: string): string;
  verifyResetPasswordToken(token: string): Promise<JwtPayload>;
}
