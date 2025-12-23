import {runCommand} from '@oclif/test';
import {expect} from 'chai';

describe('track changes', () => {
  it('should accept --user flag', async () => {
    // This should fail because the flag is not defined yet
    const {stdout} = await runCommand('track changes --user "Test User"');
    expect(stdout).to.contain('"user":"Test User"');
  });

  it('should accept --json flag', async () => {
    // This should fail because the flag is not defined yet
    const {stdout} = await runCommand('track changes --json');
    // Note: oclif handles --json specially, but we can check if it's parsed
    expect(stdout).to.contain('"json":true');
  });
});
