import {Command} from '@oclif/core';

export default class Changes extends Command {
  static description = 'Track changes in a Salesforce org';
  static flags = {};

  public async run(): Promise<void> {
    const {flags} = await this.parse(Changes);
    this.log(`Flags parsed: ${JSON.stringify(flags)}`);
  }
}
