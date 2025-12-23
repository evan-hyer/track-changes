import {Org} from '@salesforce/core';

export class OrgService {
  public async getOrg(aliasOrUsername?: string): Promise<Org> {
    throw new Error(`Not implemented: ${aliasOrUsername}`);
  }
}
