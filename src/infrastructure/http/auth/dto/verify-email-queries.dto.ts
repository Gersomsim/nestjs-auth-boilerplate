import { IsOptional, IsString } from 'class-validator';

export class VerifyEmailQueriesDto {
  @IsOptional()
  @IsString()
  token: string;
}
