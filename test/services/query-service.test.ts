import {expect} from 'chai';

import {mapSourceMemberToChange, MetadataChange} from '../../src/services/query-service.js';

describe('QueryService', () => {
  describe('mapSourceMemberToChange', () => {
    it('should map SourceMember to MetadataChange correctly', () => {
      const sourceMember = {
        ChangedBy: {
          Name: 'Test User',
        },
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        SystemModstamp: '2023-01-01T12:00:00.000+0000',
      };

      const expectedChange: MetadataChange = {
        componentName: 'MyClass',
        date: '2023-01-01T12:00:00.000+0000',
        modifiedBy: 'Test User',
        type: 'ApexClass',
      };

      const result = mapSourceMemberToChange(sourceMember);
      expect(result).to.deep.equal(expectedChange);
    });

    it('should handle missing ChangedBy info gracefully', () => {
       const sourceMember = {
        ChangedBy: null,
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        SystemModstamp: '2023-01-01T12:00:00.000+0000',
      };

      const result = mapSourceMemberToChange(sourceMember);
      expect(result.modifiedBy).to.equal('Unknown');
    });
  });
});
