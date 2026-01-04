import {Command} from '@oclif/core';
import {Org} from '@salesforce/core';
import {expect} from 'chai';
import {createSandbox, match, SinonSandbox, SinonSpyCall, SinonStub} from 'sinon';

import TrackChanges from '../../src/commands/track.js';
import {OrgService} from '../../src/services/org-service.js';
import {QueryService} from '../../src/services/query-service-class.js';

describe('root command', () => {
  let sandbox: SinonSandbox;
  let logStub: SinonStub;
  let errorStub: SinonStub;
  let writeFileStub: SinonStub;
  let openFileStub: SinonStub;

  beforeEach(() => {
    sandbox = createSandbox();
    logStub = sandbox.stub(Command.prototype, 'log');
    errorStub = sandbox.stub(Command.prototype, 'error');
    // Stub public method writeFile
    writeFileStub = sandbox.stub(TrackChanges.prototype, 'writeFile').resolves();
    // Stub private method openFile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openFileStub = sandbox.stub(TrackChanges.prototype as any, 'openFile');
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

    await TrackChanges.run([]);

    expect(logStub.called).to.be.true;
    // Check if any call contains the string
    const calls = logStub.getCalls().map((c: SinonSpyCall) => c.args.join(' '));
    const output = calls.join('\n');
    expect(output).to.contain('MyClass');
    expect(output).to.contain('ApexClass');
    expect(output).to.contain('John Doe');
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

    await TrackChanges.run(['--output', 'json']);

    const calls = logStub.getCalls().map((c) => c.args.join(' '));
    const output = calls.join('\n');
    const parsed = JSON.parse(output);
    expect(parsed).to.have.lengthOf(1);
    expect(parsed[0].componentName).to.equal('MyClass');
  });

  it('should handle errors gracefully', async () => {
    sandbox.stub(OrgService.prototype, 'getOrg').rejects(new Error('Auth failed'));
    
    await TrackChanges.run([]);
    
    expect(errorStub.called).to.be.true;
    expect(errorStub.firstCall.args[0]).to.contain('Auth failed');
  });

  it('should handle --user flag by passing it to QueryService', async () => {
    const mockOrg = {
      getConnection: () => ({}),
    } as unknown as Org;
    sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);
    const queryStub = sandbox.stub(QueryService.prototype, 'queryChanges').resolves([]);

    await TrackChanges.run(['--user', 'Target User']);

    expect(queryStub.calledWith(match({username: 'Target User'}))).to.be.true;
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
    
    await TrackChanges.run(['--output', 'html', '--out-file', 'metadata-changes-report.html']);

    const calls = logStub.getCalls().map((c) => c.args.join(' '));
    const output = calls.join('\n');

    expect(output).to.contain('HTML report generated');
    expect(output).to.contain('metadata-changes-report.html');
    
    expect(writeFileStub.called).to.be.true;
    expect(writeFileStub.firstCall.args[0]).to.equal('metadata-changes-report.html');
    expect(openFileStub.called).to.be.true;
    expect(openFileStub.firstCall.args[0]).to.equal('metadata-changes-report.html');
  });

    it('should be configured as root command (empty alias)', () => {

      expect(TrackChanges.aliases).to.deep.equal(['']);

    });

  

    it('should use default timestamped filename for HTML report when no out-file provided', async () => {

      const mockOrg = {

        getConnection: () => ({}),

      } as unknown as Org;

      sandbox.stub(OrgService.prototype, 'getOrg').resolves(mockOrg);

      sandbox.stub(QueryService.prototype, 'queryChanges').resolves([]);

  

      await TrackChanges.run(['--output', 'html']);

  

      expect(writeFileStub.called).to.be.true;

      expect(writeFileStub.firstCall.args[0]).to.match(/metadata-changes-.*\.html/);

    });

  

    it('should error if user flag is empty', async () => {

      await TrackChanges.run(['--user', '   ']);

      expect(errorStub.called).to.be.true;

      expect(errorStub.firstCall.args[0]).to.contain('User flag cannot be empty');

    });

  });

  