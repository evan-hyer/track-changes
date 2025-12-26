import {Connection} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, SinonSandbox, SinonStub, match} from 'sinon';

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

  it('should query SourceMembers and fetch User names (resolving IDs)', async () => {
    const mockSourceMembers: SourceMember[] = [
      {
        ChangedById: '005xxx',
        MemberName: 'MyClass',
        MemberType: 'ApexClass',
        RevisionNum: 1,
        SystemModstamp: '2023-01-01T10:00:00.000+0000',
        ChangedBy: null // Simulating what we get if we don't select it
      },
    ];
    
    const mockUsers = [
        { Id: '005xxx', Name: 'Test User' }
    ];

    const queryStub = mockConnection.tooling.query as SinonStub;
    
    // Mock SourceMember query
    queryStub.withArgs(match(/FROM SourceMember/)).resolves({
      done: true, records: mockSourceMembers, totalSize: 1,
    });
    
    // Mock User query
    queryStub.withArgs(match(/FROM User/)).resolves({
        done: true, records: mockUsers, totalSize: 1
    });

    const changes = await queryService.queryChanges();

    expect(changes).to.have.lengthOf(1);
    expect(changes[0].componentName).to.equal('MyClass');
    expect(changes[0].modifiedBy).to.equal('Test User');
    
    // Verification
    expect(queryStub.calledTwice, 'Should call query twice (SourceMember + User)').to.be.true;
    // The first call should be SourceMember, and it should use ChangedById
    const firstCallArgs = queryStub.getCalls().find(call => call.args[0].includes('FROM SourceMember'))?.args[0];
    expect(firstCallArgs).to.exist;
    expect(firstCallArgs).to.contain('ChangedById');
    expect(firstCallArgs).to.not.contain('ChangedBy.Name');
  });

   it('should filter by username by first resolving the User ID', async () => {
     const queryStub = mockConnection.tooling.query as SinonStub;
     
     // 1. User Query (to resolve name -> id)
     queryStub.withArgs(match(/FROM User/)).resolves({
         done: true, records: [{ Id: '005Target', Name: 'TargetUser' }], totalSize: 1
     });

     // 2. SourceMember Query
     queryStub.withArgs(match(/FROM SourceMember/)).resolves({
        done: true, records: [], totalSize: 0,
     });

    await queryService.queryChanges('TargetUser');

     expect(queryStub.calledTwice, 'Should query User then SourceMember').to.be.true;
     
     // Find the SourceMember call
     const sourceMemberCallArgs = queryStub.getCalls().find(call => call.args[0].includes('FROM SourceMember'))?.args[0];
     
     expect(sourceMemberCallArgs).to.contain("WHERE ChangedById = '005Target'");
   });
});