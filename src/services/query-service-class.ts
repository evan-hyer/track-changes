import {Connection} from '@salesforce/core';

import {MetadataChange, SourceMember} from './types.js';

export class QueryService {
  constructor(private connection: Connection) {}

  public async queryChanges(username?: string): Promise<MetadataChange[]> {
    let userIdFilter: string | undefined;

    // 1. Resolve Username to ID if provided
    if (username) {
      const sanitizedUsername = this.sanitizeSoqlString(username);
      const userQuery = `SELECT Id FROM User WHERE Name = '${sanitizedUsername}'`;
      const userResult = await this.connection.tooling.query<{Id: string}>(userQuery);
      if (userResult.totalSize === 0) {
        return [];
      }

      userIdFilter = userResult.records[0].Id;
    }

    // 2. Query SourceMember
    let query = 'SELECT MemberName, MemberType, RevisionCounter, ChangedBy, SystemModstamp FROM SourceMember';

    if (userIdFilter) {
      // userIdFilter is from internal query result, safe to use directly or sanitized
      query += ` WHERE ChangedBy = '${this.sanitizeSoqlString(userIdFilter)}'`;
    }

    const result = await this.connection.tooling.query<SourceMember>(query);

    // Check if records is undefined or null, and default to empty array if so.
    const records = result.records || [];

    if (records.length === 0) {
      return [];
    }

    // 3. Resolve User Names
    // Note: When selecting 'ChangedBy' directly without traversal, it returns the User ID.
    const userIds = [
      ...new Set(
        records
          .map((r) => (typeof r.ChangedBy === 'string' ? r.ChangedBy : null))
          .filter(Boolean),
      ),
    ] as string[];
    
    const userMap = new Map<string, string>();

    if (userIds.length > 0) {
      const idsString = userIds.map((id) => `'${this.sanitizeSoqlString(id)}'`).join(',');
      const nameQuery = `SELECT Id, Name FROM User WHERE Id IN (${idsString})`;
      const nameResult = await this.connection.tooling.query<{Id: string; Name: string}>(nameQuery);

      // Store using 15-char ID to ensure matching (SourceMember often returns 15-char, User query returns 18-char)
      for (const u of nameResult.records) {
        userMap.set(u.Id.slice(0, 15), u.Name);
      }
    }

    return records.map((record) => {
      // The record.ChangedBy field holds the ID here
      const userId = typeof record.ChangedBy === 'string' ? record.ChangedBy : null;
      // Normalize lookup ID to 15 chars
      const userName = userId ? userMap.get(userId.slice(0, 15)) : undefined;

      const mappedRecord = {
        ...record,
        ChangedBy: userName ? {Name: userName} : null,
      };

      return this.mapSourceMemberToChange(mappedRecord as SourceMember);
    });
  }

  private mapSourceMemberToChange(sourceMember: SourceMember): MetadataChange {
    let modifiedBy = 'Unknown';
    if (sourceMember.ChangedBy) {
      if (typeof sourceMember.ChangedBy === 'string') {
        modifiedBy = sourceMember.ChangedBy; // It's an ID if not resolved
      } else if ('Name' in sourceMember.ChangedBy) {
        modifiedBy = sourceMember.ChangedBy.Name;
      }
    }

    return {
      componentName: sourceMember.MemberName,
      date: sourceMember.SystemModstamp,
      modifiedBy,
      type: sourceMember.MemberType,
    };
  }

  private sanitizeSoqlString(input: string): string {
    return input.replaceAll('\\', String.raw`\\`).replaceAll("'", String.raw`\'`);
  }
}


    