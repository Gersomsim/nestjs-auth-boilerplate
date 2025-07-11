import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  isVerified?: boolean;
  isActive?: boolean;
  verifiedAt?: Date;
}

export class GetUserDto {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isActive: boolean;
}
