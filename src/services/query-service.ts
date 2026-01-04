import {Connection} from '@salesforce/core';

import {SoqlQueryBuilder} from './soql-query-builder.js';
import {MetadataChange, SourceMember} from './types.js';
import {sanitizeSoqlString} from './utils.js';

export interface QueryOptions {
  name?: string;
  since?: string;
  types?: string[];
  until?: string;
  username?: string;
}

export class QueryService {
  constructor(private connection: Connection) {}

  public async queryChanges(options: QueryOptions = {}): Promise<MetadataChange[]> {
    let userIdFilter: string | undefined;

    // 1. Resolve Username to ID if provided
    if (options.username) {
      const sanitizedUsername = sanitizeSoqlString(options.username);
      const userQuery = `SELECT Id FROM User WHERE Name = '${sanitizedUsername}'`;
      const userResult = await this.connection.tooling.query<{Id: string}>(userQuery);
      if (userResult.totalSize === 0) {
        throw new Error(`User '${options.username}' not found in the org.`);
      }

      userIdFilter = userResult.records[0].Id;
    }

    // 2. Build SourceMember Query
    const builder = new SoqlQueryBuilder();

    if (userIdFilter) {
      builder.filterByUser(userIdFilter);
    }

    if (options.types && options.types.length > 0) {
      builder.filterByTypes(options.types);
    }

    if (options.name) {
      builder.filterByName(options.name);
    }

    if (options.since || options.until) {
      builder.filterByDateRange(options.since || '1970-01-01T00:00:00Z', options.until);
    }

    const query = builder.build();
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
          .map((r) => r.ChangedBy)
          .filter((cb): cb is string => typeof cb === 'string'),
      ),
    ];

    const userMap = new Map<string, string>();

    if (userIds.length > 0) {
      const idsString = userIds.map((id) => `'${sanitizeSoqlString(id)}'`).join(',');
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

      return this.mapSourceMemberToChange(mappedRecord);
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
}


    