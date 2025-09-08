import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient<Socket>();

    const secret = this.configService.get<string>('JWT_SECRET') as string;
    if (!secret) return false;

    const validation = WsAuthGuard.validateToken(
      client,
      secret,
      (token: string, options: { secret: string }) =>
        this.jwtService.verify(token, { secret: options.secret }),
    );

    if (validation.status === 'error') throw new WsException('Unauthorized');

    return true;
  }

  static validateToken(
    client: Socket,
    jwtSecret: string,
    verify: JwtService['verify'],
  ): { status: 'success' } | { status: 'error'; error: string } {
    try {
      const headers = client.handshake.headers;
      const [type, token] = headers.authorization?.split(' ') ?? [];

      if (type !== 'Bearer' || !token)
        return { status: 'error', error: 'Malformed token' };

      const payload = verify<JwtPayloadDTO>(token, {
        secret: jwtSecret,
      });

      if (!payload)
        return { status: 'error', error: 'Malformed token payload' };

      const jwtPayload = new JwtPayloadDTO({ ...payload });
      const validationErrors = validateSync(jwtPayload);
      if (validationErrors.length > 0)
        return { status: 'error', error: 'Malformed token payload' };

      return { status: 'success' };
    } catch (error) {
      if (error instanceof JsonWebTokenError)
        return { status: 'error', error: 'Invalid token' };
      if (error instanceof TokenExpiredError)
        return { status: 'error', error: 'Token expired' };

      return { status: 'error', error: 'Error validating token' };
    }
  }
}
