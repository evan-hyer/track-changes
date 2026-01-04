import {expect} from 'chai';

import {SoqlQueryBuilder} from '../../src/services/soql-query-builder.js';

describe('SoqlQueryBuilder', () => {
  let builder: SoqlQueryBuilder;

  beforeEach(() => {
    builder = new SoqlQueryBuilder();
  });

  it('should build a basic query with no filters', () => {
    const query = builder.build();
    expect(query).to.equal('SELECT MemberName, MemberType, RevisionCounter, ChangedBy, SystemModstamp FROM SourceMember');
  });

  it('should filter by User ID', () => {
    const query = builder.filterByUser('005xxxxxxxxxxxx').build();
    expect(query).to.contain("ChangedBy = '005xxxxxxxxxxxx'");
  });

  it('should sanitize User ID', () => {
    const query = builder.filterByUser("' OR '1'='1").build();
    expect(query).not.to.contain("' OR '1'='1");
    expect(query).to.contain(String.raw`\'`);
  });

  it('should filter by multiple Member Types', () => {
    const query = builder.filterByTypes(['ApexClass', 'CustomObject']).build();
    expect(query).to.contain("MemberType IN ('ApexClass','CustomObject')");
  });

  it('should filter by Member Name (LIKE)', () => {
    const query = builder.filterByName('MyClass%').build();
    expect(query).to.contain("MemberName LIKE 'MyClass%'");
  });

  it('should filter by Date Range (Start Only)', () => {
    const query = builder.filterByDateRange('2023-01-01T00:00:00Z').build();
    expect(query).to.contain("SystemModstamp >= '2023-01-01T00:00:00Z'");
  });

  it('should filter by Date Range (Start and End)', () => {
    const query = builder.filterByDateRange('2023-01-01T00:00:00Z', '2023-12-31T23:59:59Z').build();
    expect(query).to.contain("SystemModstamp >= '2023-01-01T00:00:00Z'");
    expect(query).to.contain("SystemModstamp <= '2023-12-31T23:59:59Z'");
  });

  it('should combine multiple filters with AND', () => {
    const query = builder
      .filterByUser('005xxx')
      .filterByTypes(['ApexClass'])
      .build();
    
    expect(query).to.contain("ChangedBy = '005xxx'");
    expect(query).to.contain(' AND ');
    expect(query).to.contain("MemberType IN ('ApexClass')");
  });
});

