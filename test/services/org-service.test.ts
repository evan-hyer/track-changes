import {Org} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, SinonSandbox, SinonStub} from 'sinon';

import {OrgService} from '../../src/services/org-service.js';

describe('OrgService', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });


  afterEach(() => {
    sandbox.restore();
  });

  it('should return an Org instance when alias is provided', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;

    sandbox.stub(Org, 'create').resolves(mockOrg);

    const service = new OrgService();
    const org = await service.getOrg('test-org');

    expect(org).to.equal(mockOrg);
    expect((Org.create as SinonStub).calledWith({aliasOrUsername: 'test-org'})).to.be.true;
  });

  it('should return default Org instance when no alias is provided', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;

    sandbox.stub(Org, 'create').resolves(mockOrg);

    const service = new OrgService();
    const org = await service.getOrg();

    expect(org).to.equal(mockOrg);
    expect((Org.create as SinonStub).calledWith({})).to.be.true;
  });
});