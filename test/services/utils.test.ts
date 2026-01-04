import {expect} from 'chai';

import {escapeHtml, sanitizeSoqlString} from '../../src/services/utils.js';

describe('Utils', () => {
  describe('sanitizeSoqlString', () => {
    it('should escape single quotes', () => {
      expect(sanitizeSoqlString("O'Brien")).to.equal(String.raw`O\'Brien`);
    });

    it('should escape backslashes', () => {
      expect(sanitizeSoqlString(String.raw`C:\path`)).to.equal(String.raw`C:\\path`);
    });

    it('should handle complex strings', () => {
      expect(sanitizeSoqlString("'; DROP TABLE User; --")).to.equal(String.raw`\'; DROP TABLE User; --`);
    });
  });

  describe('escapeHtml', () => {
    it('should escape special characters', () => {
      expect(escapeHtml('<script>alert("xss")&</script>')).to.equal('&lt;script&gt;alert(&quot;xss&quot;)&amp;&lt;/script&gt;');
    });

    it('should escape single quotes', () => {
      expect(escapeHtml("'")).to.equal('&#039;');
    });

    it('should return empty string for null', () => {
      expect(escapeHtml(null)).to.equal('');
    });

    it('should return empty string for undefined', () => {
      // @ts-expect-error testing invalid input
      expect(escapeHtml()).to.equal('');
    });

    it('should return empty string for empty string', () => {
      expect(escapeHtml('')).to.equal('');
    });
  });
});
