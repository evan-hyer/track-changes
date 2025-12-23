import {runCommand} from '@oclif/test';
import {Org} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, SinonSandbox} from 'sinon';

import {DisplayService} from '../../../src/services/display-service.js';
import {OrgService} from '../../../src/services/org-service.js';
import {QueryService} from '../../../src/services/query-service-class.js';

describe('track changes integration', () => {
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
    // DisplayService formatting is tested elsewhere, but we can verify it's called
    const formatTableStub = sandbox.stub(DisplayService.prototype, 'formatTableData').returns(mockChanges);

    const {stdout} = await runCommand('track changes');

    expect(stdout).to.contain('MyClass');
    expect(stdout).to.contain('ApexClass');
    expect(stdout).to.contain('John Doe');
    expect(formatTableStub.calledOnce).to.be.true;
  });

  it('should handle --user flag by passing it to QueryService', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    const queryStub = sandbox.stub(QueryService.prototype, 'queryChanges').resolves([]);

    await runCommand('track changes --user "Target User"');

    expect(queryStub.calledWith('Target User')).to.be.true;
  });
});