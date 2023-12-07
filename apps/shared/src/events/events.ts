import type { DidDocument, ConnectionRecord } from '@aries-framework/core';

import { utils } from '@aries-framework/core';

export class BaseEvent<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  public id: string;
  public type: string;
  public timestamp: Date;
  public data: T;

  public constructor(data: T) {
    this.id = utils.uuid();
    this.type = this.constructor.name;
    this.timestamp = new Date();
    this.data = data;
  }
}

export class EventInfoPublicDid extends BaseEvent<{
  didDocument: DidDocument;
}> {}

export class EventDidcommConnectionsGetAll extends BaseEvent<{
  connections: Array<ConnectionRecord>;
}> {}

export class EventDidcommConnectionsGetById extends BaseEvent<{
  connection: ConnectionRecord | null;
}> {}
