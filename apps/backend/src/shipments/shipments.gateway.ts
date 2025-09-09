import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENT } from './consts/event';
import { Shipment } from './entities/shipment.entity';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ namespace: 'shipments', cors: true })
export class ShipmentsGateway implements OnGatewayInit<Server> {
  @WebSocketServer()
  socket: Server;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(socket: Server) {
    const secret = this.configService.get<string>('JWT_SECRET') as string;

    socket.use((client, next) => {
      const validation = WsAuthGuard.validateToken(
        client,
        secret,
        (token: string, options: { secret: string }) =>
          this.jwtService.verify(token, { secret: options.secret }),
      );
      if (validation.status === 'success') return next();
      next(new Error(validation.error));
    });
  }

  notifyQueryChanges({ shipments }: { shipments: Shipment[] }) {
    this.socket.emit(EVENT.QUERY, shipments);
  }

  notifyRecordChanges({ shipment }: { shipment: Shipment }) {
    this.socket.to(`${shipment.id}`).emit(EVENT.FIND, shipment);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage(EVENT.SUBSCRIBE_TO_ID)
  async subscribeToId(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(`${id}`);
    this.socket.emit(EVENT.SUBSCRIBE_TO_ID, 'Connected');
  }
}
