import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUseCaseService } from './use-case.interface';
import { UserRepository } from '../../user/domain/repository/user.repository';
import {
  CreateUserModel,
  UserModel,
} from '../../user/domain/models/user.model';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config/envs.config';
import { ChangePasswordDto } from '../infrastructure/dto/change-password.dto';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { LoginResponse } from './interfaces';
import { IAuthRepository } from '../domain/repositories/repository.interface';
import { IUserRepository } from '../../user/domain/repository/user.repository.interface';

@Injectable()
export class UseCaseService implements IUseCaseService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return this.getAuth(userWithoutPassword);
  }
  async register(user: CreateUserModel): Promise<LoginResponse> {
    const userExists = await this.authRepository.findByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: passwordHash };
    const userCreated = await this.userRepository.create(newUser);
    this.sendVerificationEmail(userCreated.email);
    return this.getAuth(userCreated);
  }
  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
  logout(): void {
    // En JWT el logout se maneja del lado del cliente eliminando el token
    // El servidor no mantiene estado de las sesiones
  }
  refreshToken(user: UserModel): LoginResponse {
    return this.getAuth(user);
  }
  forgotPassword(email: string): void {
    this.sendPasswordResetEmail(email);
  }
  async resetPassword(
    user: UserModel,
    password: string,
  ): Promise<{ message: string }> {
    const passwordHash = await bcrypt.hash(password, 10);
    await this.userRepository.update(user.id, { password: passwordHash });
    return { message: 'Password reset successfully' };
  }
  async changePassword(
    user: UserModel,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const userDB = await this.authRepository.findByEmail(user.email);
    if (!userDB) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const verifyPassword = await bcrypt.compare(
      changePasswordDto.password,
      userDB.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException('Invalid current password');
    }
    const passwordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.update(user.id, { password: passwordHash });
    return { message: 'Password changed successfully' };
  }
  async verifyEmail(
    user: UserModel,
  ): Promise<{ message: string; user: UserModel }> {
    const userUpdated = await this.userRepository.update(user.id, {
      isVerified: true,
      verifiedAt: new Date(),
    });
    return { message: 'Email verified successfully', user: userUpdated };
  }
  resendVerificationEmail(email: string): { message: string } {
    this.sendVerificationEmail(email);
    return { message: 'Verification email sent' };
  }
  sendPasswordResetEmail(email: string): void {
    const token = this.getJwtTokenForgotPassword(email);
    console.log({ email, token });
    // TODO: Send email with token
  }
  sendVerificationEmail(email: string): void {
    const token = this.getJwtTokenForgotPassword(email);
    console.log({ email, token });
    // TODO: Send email with token
  }
  private getAuth(user: UserModel): LoginResponse {
    return {
      user,
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
