import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await bcrypt.compare(pass, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
