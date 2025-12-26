export interface MetadataChange {
  componentName: string;
  date: string;
  modifiedBy: string;
  type: string;
}

export interface SourceMember {
  ChangedBy?: null | {
    Name: string;
  };
  ChangedById: string;
  MemberName: string;
  MemberType: string;
  RevisionNum: number;
  SystemModstamp: string;
}

export function mapSourceMemberToChange(sourceMember: SourceMember): MetadataChange {
  return {
    componentName: sourceMember.MemberName,
    date: sourceMember.SystemModstamp,
    modifiedBy: sourceMember.ChangedBy ? sourceMember.ChangedBy.Name : 'Unknown',
    type: sourceMember.MemberType,
  };
}