import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNjk0MDI5NzU0LCJleHAiOjE2OTQwNDA1NTR9.Q2c0-ICTNrM7jl7NMI9FryzFwCvd833qwM56cULWH-A',
    description: 'JWT token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
