import {Command, Flags} from '@oclif/core';

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

  public async run(): Promise<void> {
    const {flags} = await this.parse(Changes);
    this.log(`Flags parsed: ${JSON.stringify(flags)}`);
  }
}
