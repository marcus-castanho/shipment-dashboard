import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';
import { validate } from 'class-validator';
import { CustomRequest } from './types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    const secret = this.configService.get<string>('JWT_SECRET') as string;
    if (!secret) throw new InternalServerErrorException();

    const payload = await this.jwtService
      .verifyAsync<JwtPayloadDTO>(token, { secret })
      .catch(() => null);
    if (!payload) throw new UnauthorizedException();

    const jwtPayload = new JwtPayloadDTO({ ...payload });
    const validation = await validate(jwtPayload).then((errors) => {
      if (errors.length > 0) return { status: 'error' };
      return { status: 'success' };
    });

    if (validation.status === 'error') throw new UnauthorizedException();

    request.userId = payload.sub;

    return true;
  }
}
