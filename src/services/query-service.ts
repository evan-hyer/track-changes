export interface MetadataChange {
  componentName: string;
  type: string;
  modifiedBy: string;
  date: string;
}

export function mapSourceMemberToChange(sourceMember: any): MetadataChange {
  throw new Error(`Not implemented: ${sourceMember}`);
}
