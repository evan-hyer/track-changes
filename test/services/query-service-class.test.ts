import {Connection} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, SinonSandbox, SinonStub} from 'sinon';

import {QueryService} from '../../src/services/query-service-class.js';
import {SourceMember} from '../../src/services/query-service.js';

describe('QueryService Class', () => {
  let sandbox: SinonSandbox;
  let mockConnection: Connection;
  let queryService: QueryService;

  beforeEach(() => {
    sandbox = createSandbox();
    mockConnection = {
      tooling: {
        query: sandbox.stub(),
      },
    } as unknown as Connection;
    queryService = new QueryService(mockConnection);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should query SourceMembers and return mapped MetadataChanges', async () => {
    const mockSourceMembers: SourceMember[] = [
      {
        ChangedBy: {Name: 'Test User'},
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        SystemModstamp: '2023-01-01T10:00:00.000+0000',
      },
    ];

    (mockConnection.tooling.query as SinonStub).resolves({
      done: true,
      records: mockSourceMembers,
      totalSize: 1,
    });

    const changes = await queryService.queryChanges();

    expect(changes).to.have.lengthOf(1);
    expect(changes[0].componentName).to.equal('MyClass');
    expect(changes[0].modifiedBy).to.equal('Test User');
    
    expect((mockConnection.tooling.query as SinonStub).calledOnce).to.be.true;
    const queryCall = (mockConnection.tooling.query as SinonStub).getCall(0);
    expect(queryCall.args[0]).to.contain('SELECT MemberName, MemberType, RevisionNum, ChangedBy.Name, SystemModstamp FROM SourceMember');
  });

   it('should filter by username if provided', async () => {
     (mockConnection.tooling.query as SinonStub).resolves({
      done: true,
      records: [],
      totalSize: 0,
    });

    await queryService.queryChanges('TargetUser');

     const queryCall = (mockConnection.tooling.query as SinonStub).getCall(0);
     expect(queryCall.args[0]).to.contain("WHERE ChangedBy.Name = 'TargetUser'");
   });
});
