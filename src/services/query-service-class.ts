import {Connection} from '@salesforce/core';

import {mapSourceMemberToChange, MetadataChange, SourceMember} from './query-service.js';

export class QueryService {
  constructor(private connection: Connection) {}

  public async queryChanges(username?: string): Promise<MetadataChange[]> {
    let query = 'SELECT MemberName, MemberType, RevisionNum, ChangedBy.Name, SystemModstamp FROM SourceMember';
    
    if (username) {
      query += ` WHERE ChangedBy.Name = '${username}'`;
    }

    const result = await this.connection.tooling.query<SourceMember>(query);
    
    // Check if records is undefined or null, and default to empty array if so.
    const records = result.records || [];
    
    return records.map((record) => mapSourceMemberToChange(record));
  }
}