import {expect} from 'chai';
import {MetadataChange, mapSourceMemberToChange} from '../../src/services/query-service.js';

describe('QueryService', () => {
  describe('mapSourceMemberToChange', () => {
    it('should map SourceMember to MetadataChange correctly', () => {
      const sourceMember = {
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        ChangedBy: {
          Name: 'Test User',
        },
        SystemModstamp: '2023-01-01T12:00:00.000+0000',
      };

      const expectedChange: MetadataChange = {
        componentName: 'MyClass',
        type: 'ApexClass',
        modifiedBy: 'Test User',
        date: '2023-01-01T12:00:00.000+0000',
      };

      const result = mapSourceMemberToChange(sourceMember);
      expect(result).to.deep.equal(expectedChange);
    });

    it('should handle missing ChangedBy info gracefully', () => {
       const sourceMember = {
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        ChangedBy: null,
        SystemModstamp: '2023-01-01T12:00:00.000+0000',
      };

      const result = mapSourceMemberToChange(sourceMember);
      expect(result.modifiedBy).to.equal('Unknown');
    });
  });
});
