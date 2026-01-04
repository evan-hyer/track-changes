import {expect} from 'chai';

import {DisplayService} from '../../src/services/display-service.js';
import {MetadataChange} from '../../src/services/types.js';

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

  it('should format changes as HTML string', () => {
    const result = displayService.formatHtml(mockChanges);
    expect(result).to.contain('<!DOCTYPE html>');
    expect(result).to.contain('MyClass');
    expect(result).to.contain('John Doe');
    expect(result).to.contain('<table>');
  });

  it('should escape special characters in HTML output', () => {
    const changes: MetadataChange[] = [
      {
        componentName: '<script>alert("xss")</script>',
        date: '2023-01-01',
        modifiedBy: 'Hacker & Co',
        type: 'ApexClass',
      },
    ];
    const result = displayService.formatHtml(changes);
    expect(result).to.contain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(result).to.contain('Hacker &amp; Co');
  });
});
