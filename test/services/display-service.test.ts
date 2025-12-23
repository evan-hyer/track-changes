import {expect} from 'chai';

import {DisplayService} from '../../src/services/display-service.js';
import {MetadataChange} from '../../src/services/query-service.js';

describe('DisplayService', () => {
  let displayService: DisplayService;

  beforeEach(() => {
    displayService = new DisplayService();
  });

  const mockChanges: MetadataChange[] = [
    {
      componentName: 'MyClass',
      date: '2023-01-01T10:00:00Z',
      modifiedBy: 'John Doe',
      type: 'ApexClass',
    },
  ];

  it('should format changes as JSON string', () => {
    const result = displayService.formatJson(mockChanges);
    const parsed = JSON.parse(result);
    expect(parsed).to.deep.equal(mockChanges);
  });

  it('should return data for table display', () => {
    // This is a bit abstract, maybe just check if it returns the array as is or formatted
    const result = displayService.formatTableData(mockChanges);
    expect(result).to.deep.equal(mockChanges);
  });
});
