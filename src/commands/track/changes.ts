import {Command, Flags} from '@oclif/core';

import {DisplayService} from '../../services/display-service.js';
import {OrgService} from '../../services/org-service.js';
import {QueryService} from '../../services/query-service-class.js';

export default class Changes extends Command {
  static description = 'Track changes in a Salesforce org';
static flags = {
    json: Flags.boolean({
      description: 'Output result in JSON format',
    }),
    'target-org': Flags.string({
      char: 'o',
      description: 'The alias or username of the org to track changes in',
    }),
    user: Flags.string({
      char: 'u',
      description: 'Filter changes by the user who made them',
    }),
  };
private displayService = new DisplayService();
  private orgService = new OrgService();

  public async run(): Promise<void> {
    const {flags} = await this.parse(Changes);

    try {
      const org = await this.orgService.getOrg(flags['target-org']);
      const connection = org.getConnection();
      const queryService = new QueryService(connection);

      const changes = await queryService.queryChanges(flags.user);

      if (flags.json) {
        this.log(this.displayService.formatJson(changes));
      } else {
        // Fallback to simple log for now to ensure output is captured in tests
        this.log('Metadata Changes:');
        for (const change of changes) {
          this.log(`${change.componentName} | ${change.type} | ${change.modifiedBy} | ${change.date}`);
        }
      }
    } catch (error) {
      this.error(error instanceof Error ? error.message : String(error));
    }
  }
}
