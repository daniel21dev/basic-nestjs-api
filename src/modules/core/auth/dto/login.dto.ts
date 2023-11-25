import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'jhon@mail.com',
  })
  email: string;
  password: string;
}
