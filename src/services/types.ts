export interface MetadataChange {
  componentName: string;
  date: string;
  modifiedBy: string;
  type: string;
}

export interface SourceMember {
  ChangedBy?: null | string | {
    Name: string;
  };
  MemberName: string;
  MemberType: string;
  RevisionCounter: number;
  SystemModstamp: string;
}
