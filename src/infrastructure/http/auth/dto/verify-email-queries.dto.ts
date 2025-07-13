import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class VerifyEmailQueriesDto {
  @ApiProperty({
    description: 'The token to verify the email',
    example: '1234567890...',
  })
  @IsOptional()
  @IsString()
  token: string;
}
