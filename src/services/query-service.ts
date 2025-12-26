export interface MetadataChange {
  componentName: string;
  date: string;
  modifiedBy: string;
  type: string;
}

export interface SourceMember {
  ChangedBy?: string | null | {
    Name: string;
  };
  MemberName: string;
  MemberType: string;
  RevisionCounter: number;
  SystemModstamp: string;
}

export function mapSourceMemberToChange(sourceMember: SourceMember): MetadataChange {
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