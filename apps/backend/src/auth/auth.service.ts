import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(id: number) {
    const payload = { sub: id };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
