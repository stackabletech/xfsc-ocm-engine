import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { Connection, NATSServices } from '../common/constants.js';

@Injectable()
export default class NatsClientService {
  public constructor(
    @Inject(NATSServices.SERVICE_NAME) private natsClient: ClientProxy,
  ) {}

  public getConnectionById(connectionId: string) {
    const pattern = {
      endpoint: `${Connection.NATS_ENDPOINT}/${Connection.GET_CONNECTION_BY_ID}`,
    };
    const payload = { connectionId };
    return lastValueFrom(this.natsClient.send(pattern, payload));
  }

  public connectionTrusted(connectionId: string) {
    const pattern = {
      endpoint: `${Connection.NATS_ENDPOINT}/${Connection.MAKE_CONNECTION_TRUSTED}`,
    };
    const payload = { connectionId };
    return lastValueFrom(this.natsClient.send(pattern, payload));
  }

  public getReceivedConnections() {
    const pattern = {
      endpoint: `${Connection.NATS_ENDPOINT}/${Connection.GET_RECEIVED_CONNECTIONS}`,
    };
    const payload = {};
    return lastValueFrom(this.natsClient.send(pattern, payload));
  }
}
