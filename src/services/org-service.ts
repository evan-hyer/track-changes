import {Org} from '@salesforce/core';

/**
 * Service to handle Salesforce Org connections.
 */
export class OrgService {
  /**
   * Retrieves an Org instance for the given alias or username.
   * If no alias or username is provided, it returns the default org.
   *
   * @param aliasOrUsername - The alias or username of the org.
   * @returns A promise that resolves to an Org instance.
   */
  public async getOrg(aliasOrUsername?: string): Promise<Org> {
    const options = aliasOrUsername ? {aliasOrUsername} : {};
    return Org.create(options);
  }
}