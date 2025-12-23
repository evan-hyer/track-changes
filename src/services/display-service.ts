import {MetadataChange} from './query-service.js';

/**
 * Service to handle CLI output display formatting.
 */
export class DisplayService {
  /**
   * Formats the changes as a JSON string.
   *
   * @param changes - The list of metadata changes.
   * @returns A JSON string representation of the changes.
   */
  public formatJson(changes: MetadataChange[]): string {
    return JSON.stringify(changes, null, 2);
  }

  /**
   * Returns the changes formatted for table display.
   * For MVP, this just returns the original array.
   *
   * @param changes - The list of metadata changes.
   * @returns The list of metadata changes.
   */
  public formatTableData(changes: MetadataChange[]): MetadataChange[] {
    return changes;
  }
}
