interface QueryFilter {
  field: string;
  operator: string;
  value: string;
}

export class SoqlQueryBuilder {
  private filters: QueryFilter[] = [];

  public build(): string {
    let query = 'SELECT MemberName, MemberType, RevisionCounter, ChangedBy, SystemModstamp FROM SourceMember';

    if (this.filters.length > 0) {
      const whereClause = this.filters
        .map((f) => `${f.field} ${f.operator} ${f.value}`)
        .join(' AND ');

      query += ` WHERE ${whereClause}`;
    }

    return query;
  }

  public filterByDateRange(start: string, end?: string): this {
    // Basic date validation or trust input?
    // Given the context, we treat them as strings but should probably wrap in quotes.
    // SOQL date literals can be YYYY-MM-DDThh:mm:ssZ.
    // We'll assume the input needs quoting if it's a string representation.

    this.filters.push({
      field: 'SystemModstamp',
      operator: '>=',
      value: `'${this.sanitize(start)}'`,
    });

    if (end) {
      this.filters.push({
        field: 'SystemModstamp',
        operator: '<=',
        value: `'${this.sanitize(end)}'`,
      });
    }

    return this;
  }

  public filterByName(name: string): this {
    this.filters.push({
      field: 'MemberName',
      operator: 'LIKE',
      value: `'${this.sanitize(name)}'`,
    });
    return this;
  }

  public filterByTypes(types: string[]): this {
    if (types.length === 0) {
      return this;
    }

    const value = `(${types.map((t) => `'${this.sanitize(t)}'`).join(',')})`;
    this.filters.push({
      field: 'MemberType',
      operator: 'IN',
      value,
    });
    return this;
  }

  public filterByUser(userId: string): this {
    this.filters.push({
      field: 'ChangedBy',
      operator: '=',
      value: `'${this.sanitize(userId)}'`,
    });
    return this;
  }

  private sanitize(input: string): string {
    return input.replaceAll('\\', String.raw`\\`).replaceAll("'", String.raw`\'`);
  }
}
