import {runCommand} from '@oclif/test';
import {Org} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, SinonSandbox} from 'sinon';

import {OrgService} from '../../src/services/org-service.js';
import {QueryService} from '../../src/services/query-service-class.js';

describe('root command', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should orchestrate services to display changes', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    const mockChanges = [
      {
        componentName: 'MyClass',
        date: '2023-01-01',
        modifiedBy: 'John Doe',
        type: 'ApexClass',
      },
    ];

    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    sandbox.stub(QueryService.prototype, 'queryChanges').resolves(mockChanges);

    const {stdout} = await runCommand('track');

    expect(stdout).to.contain('MyClass');
    expect(stdout).to.contain('ApexClass');
    expect(stdout).to.contain('John Doe');
  });

  it('should display changes as JSON', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    const mockChanges = [
      {
        componentName: 'MyClass',
        date: '2023-01-01',
        modifiedBy: 'John Doe',
        type: 'ApexClass',
      },
    ];

    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    sandbox.stub(QueryService.prototype, 'queryChanges').resolves(mockChanges);

    const {stdout} = await runCommand('track --output json');

    const parsed = JSON.parse(stdout);
    expect(parsed).to.have.lengthOf(1);
    expect(parsed[0].componentName).to.equal('MyClass');
  });

  it('should handle errors gracefully', async () => {
    sandbox.stub(OrgService.prototype, 'getOrg').rejects(new Error('Auth failed'));

    try {
      await runCommand('track');
    } catch (error: unknown) {
      const oclifError = error as { oclif: { exit: number } };
      expect(oclifError.oclif.exit).to.equal(2);
    }
  });

  it('should handle --user flag by passing it to QueryService', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    const queryStub = sandbox.stub(QueryService.prototype, 'queryChanges').resolves([]);

    await runCommand('track --user "Target User"');

    expect(queryStub.calledWith('Target User')).to.be.true;
  });

  it('should generate HTML report', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    const mockChanges = [
      {
        componentName: 'MyClass',
        date: '2023-01-01',
        modifiedBy: 'John Doe',
        type: 'ApexClass',
      },
    ];

    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    sandbox.stub(QueryService.prototype, 'queryChanges').resolves(mockChanges);

    // Mock fs.writeFile to prevent actual file writing (if possible via sinon on module, but hard with ESM)
    // For now, we accept it writes to disk. We can try to clean it up.
    
    const {stdout} = await runCommand('track --output html');

    expect(stdout).to.contain('HTML report generated');
    expect(stdout).to.contain('metadata-changes-report.html');
  });
});