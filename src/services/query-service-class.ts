import {Connection} from '@salesforce/core';

import {mapSourceMemberToChange, MetadataChange, SourceMember} from './query-service.js';

export class QueryService {
  constructor(private connection: Connection) {}

  public async queryChanges(username?: string): Promise<MetadataChange[]> {
    let userIdFilter: string | undefined;

    // 1. Resolve Username to ID if provided
    if (username) {
      const userQuery = `SELECT Id FROM User WHERE Name = '${username}'`;
      const userResult = await this.connection.tooling.query<{Id: string}>(userQuery);
      if (userResult.totalSize === 0) {
        return [];
      }
      userIdFilter = userResult.records[0].Id;
    }

    // 2. Query SourceMember
    let query = 'SELECT MemberName, MemberType, RevisionCounter, ChangedBy, SystemModstamp FROM SourceMember';
    
    if (userIdFilter) {
      query += ` WHERE ChangedBy = '${userIdFilter}'`;
    }

    const result = await this.connection.tooling.query<SourceMember>(query);
    
    // Check if records is undefined or null, and default to empty array if so.
    const records = result.records || [];

    if (records.length === 0) {
      return [];
    }
    
    // 3. Resolve User Names
    // Note: When selecting 'ChangedBy' directly without traversal, it returns the User ID.
    const userIds = Array.from(new Set(records.map((r) => r.ChangedBy as unknown as string).filter((id) => !!id)));
    const userMap = new Map<string, string>();

    if (userIds.length > 0) {
      const idsString = userIds.map((id) => `'${id}'`).join(',');
      const nameQuery = `SELECT Id, Name FROM User WHERE Id IN (${idsString})`;
      const nameResult = await this.connection.tooling.query<{Id: string; Name: string}>(nameQuery);
      nameResult.records.forEach((u) => userMap.set(u.Id, u.Name));
    }

    return records.map((record) => {
      // The record.ChangedBy field holds the ID here
      const userId = record.ChangedBy as unknown as string;
      const userName = userMap.get(userId);
      
      // We need to construct the object expected by mapSourceMemberToChange
      // referencing the interface which expects { Name: string } or similar
      // Actually we should check the interface definition in query-service.ts
      
      const mappedRecord = {
        ...record,
        ChangedBy: userName ? { Name: userName } : null
      };
      
      return mapSourceMemberToChange(mappedRecord as unknown as SourceMember);
    });
  }
}