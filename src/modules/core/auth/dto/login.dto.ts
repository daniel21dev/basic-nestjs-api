import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'jhon@mail.com',
  })
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
