import {Connection} from '@salesforce/core';
import {MetadataChange} from './query-service.js';

export class QueryService {
  constructor(private connection: Connection) {}

  public async queryChanges(username?: string): Promise<MetadataChange[]> {
    throw new Error(`Not implemented. Connection: ${this.connection}, Username: ${username}`);
  }
}
