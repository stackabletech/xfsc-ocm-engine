import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  EventDidcommConnectionsGetById,
  EventDidcommConnectionsGetAll,
} from '@ocm/shared';

import { ConnectionsService } from './connections.service.js';

@Controller('connections')
export class ConnectionsController {
  public constructor(private connectionsService: ConnectionsService) {}

  @MessagePattern('didcomm.connections.getAll')
  public async getAll(): Promise<EventDidcommConnectionsGetAll> {
    return new EventDidcommConnectionsGetAll({
      connections: await this.connectionsService.getAll(),
    });
  }

  @MessagePattern('didcomm.connections.getById')
  public async getById({
    id,
  }: {
    id: string;
  }): Promise<EventDidcommConnectionsGetById> {
    return new EventDidcommConnectionsGetById({
      connection: await this.connectionsService.getById(id),
    });
  }
}
