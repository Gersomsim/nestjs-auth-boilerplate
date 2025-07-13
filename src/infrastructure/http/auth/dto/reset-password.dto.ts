import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'The new password of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
