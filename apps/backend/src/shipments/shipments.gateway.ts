import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EVENT } from './consts/event';
import { Shipment } from './entities/shipment.entity';

@WebSocketGateway({ namespace: 'shipments' })
export class ShipmentsGateway {
  @WebSocketServer()
  socket: Socket;

  notifyQueryChanges({ shipments }: { shipments: Shipment[] }) {
    this.socket.emit(EVENT.QUERY, shipments);
  }

  notifyRecordChanges({ shipment }: { shipment: Shipment }) {
    this.socket.to(`${shipment.id}`).emit(EVENT.FIND, shipment);
  }

  @SubscribeMessage(EVENT.SUBSCRIPE_TO_ID)
  async subscribeToId(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log({ id });
    await client.join(`${id}`);
  }
}
