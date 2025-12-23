import {expect} from 'chai';
import {Org} from '@salesforce/core';
import sinon from 'sinon';
import {OrgService} from '../../src/services/org-service.js';

describe('OrgService', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an Org instance', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;

    sandbox.stub(Org, 'create').resolves(mockOrg);

    const service = new OrgService();
    const org = await service.getOrg('test-org');

    expect(org).to.equal(mockOrg);
    expect((Org.create as sinon.SinonStub).calledWith({aliasOrUsername: 'test-org'})).to.be.true;
  });
});
