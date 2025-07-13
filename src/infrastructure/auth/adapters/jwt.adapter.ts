import { IJwtService } from '@domain/auth/interfaces/jwt.service.interface';
import { InvalidTokenException } from '@domain/common/exceptions';
import { JwtPayload } from '@infrastructure/interfaces/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs.config';

@Injectable()
export class JwtAdapter implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(id: string): string {
    return this.jwtService.sign({ id, type: 'access' });
  }
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new InvalidTokenException(error.message);
    }
  }
  generateRefreshToken(id: string): string {
    return this.jwtService.sign(
      { id, type: 'refresh-token' },
      {
        expiresIn: envs.jwt.refresh.expiration,
        secret: envs.jwt.refresh.secret,
      },
    );
  }
  generateResetPasswordToken(id: string): string {
    return this.jwtService.sign(
      { id, type: 'forgot-password' },
      {
        expiresIn: envs.jwt.forgotPassword.expiration,
        secret: envs.jwt.forgotPassword.secret,
      },
    );
  }
  async verifyResetPasswordToken(token: string): Promise<JwtPayload> {
    return this.verify(token, envs.jwt.forgotPassword.secret);
  }

  private async verify(token: string, secret: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, { secret });
  }
}
