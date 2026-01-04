import {Command, Flags} from '@oclif/core';
import {exec} from 'node:child_process';
import * as fs from 'node:fs/promises';

import {DisplayService} from '../services/display-service.js';
import {OrgService} from '../services/org-service.js';
import {QueryService} from '../services/query-service-class.js';

export default class TrackChanges extends Command {
  static aliases = [''];
  static description = 'Track changes in a Salesforce org';
  static flags = {
    'out-file': Flags.string({
      char: 'f',
      description: 'Output filename for HTML report',
    }),
    output: Flags.string({
      char: 'o',
      default: 'table',
      description: 'Output format',
      options: ['table', 'json', 'html'],
    }),
    'target-org': Flags.string({
      char: 't',
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
    const {flags} = await this.parse(TrackChanges);

    if (flags.user !== undefined && flags.user.trim() === '') {
      this.error('User flag cannot be empty');
    }

    try {
      const org = await this.orgService.getOrg(flags['target-org']);
      const connection = org.getConnection();
      const queryService = new QueryService(connection);

      const changes = await queryService.queryChanges(flags.user);

      if (flags.output === 'json') {
        this.log(this.displayService.formatJson(changes));
      } else if (flags.output === 'html') {
        const html = this.displayService.formatHtml(changes);
        const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
        const fileName = flags['out-file'] ?? `metadata-changes-${timestamp}.html`;
        await this.writeFile(fileName, html);
        this.log(`HTML report generated: ${fileName}`);
        this.openFile(fileName);
      } else {
        // Table output (default)
        this.log('Metadata Changes:');
        for (const change of changes) {
          this.log(`${change.componentName} | ${change.type} | ${change.modifiedBy} | ${change.date}`);
        }
      }
    } catch (error) {
      this.error(error instanceof Error ? error.message : String(error));
    }
  }

  public async writeFile(path: string, content: string): Promise<void> {
    await fs.writeFile(path, content);
  }

  private openFile(filePath: string): void {
    let command = '';
    switch (process.platform) {
      case 'darwin': {
        command = `open "${filePath}"`;
        break;
      }

      case 'win32': {
        command = `start "" "${filePath}"`;
        break;
      }

      default: {
        command = `xdg-open "${filePath}"`;
        break;
      }
    }

    // Execute command but don't wait/block
    exec(command, (error) => {
      if (error) {
        // Just log debug if it fails, don't crash
      }
    });
  }
}
