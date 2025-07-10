import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserRepository } from '../../user/domain/repository/user.repository';
import { UserRepositoryInterface } from '../../user/domain/repository/user.repository.interface';
import {
  CreateUserModel,
  UserModel,
} from '../../user/domain/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from '../domain/models/auth.model';
import { envs } from 'src/config/envs.config';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<AuthModel> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordHash = user.password ?? '';
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.getAuth(user);
  }
  async register(user: CreateUserModel): Promise<AuthModel> {
    const userExists = await this.repository.findByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: passwordHash };
    const userCreated = await this.repository.create(newUser);
    return this.getAuth(userCreated);
  }
  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (eror) {
      return false;
    }
  }
  logout(user: UserModel): Promise<void> {
    return Promise.resolve();
  }
  refreshToken(user: UserModel): AuthModel {
    return this.getAuth(user);
  }

  forgotPassword(email: string): void {
    const token = this.getJwtTokenForgotPassword(email);
    console.log(token);
    // TODO: Send email with token
  }
  resetPassword(token: string, password: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  changePassword(user: UserModel, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  verifyEmail(token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resendVerificationEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendPasswordResetEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sendVerificationEmail(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private getAuth(user: UserModel) {
    const { password: _, ...userData } = user;
    return {
      user: userData,
      accessToken: this.getJwtToken({ id: user.id, type: 'access' }),
      refreshToken: this.getRefreshToken({ id: user.id, type: 'refresh' }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  private getRefreshToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {
      expiresIn: `${envs.jwt.expirationRefresh}`,
      secret: envs.jwt.secretRefresh,
    });
    return token;
  }
  private getJwtTokenForgotPassword(email: string) {
    const token = this.jwtService.sign(
      { id: email, type: 'forgot-password' },
      {
        expiresIn: envs.jwt.expirationForgotPassword,
        secret: envs.jwt.secretForgotPassword,
      },
    );
    return token;
  }
}
