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

  /**
   * Formats the changes as a basic HTML table.
   *
   * @param changes - The list of metadata changes.
   * @returns A string containing the HTML report.
   */
  public formatHtml(changes: MetadataChange[]): string {
    const rows = changes
      .map(
        (change) => `
        <tr>
          <td>${change.componentName}</td>
          <td>${change.type}</td>
          <td>${change.modifiedBy}</td>
          <td>${change.date}</td>
        </tr>`,
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Metadata Changes Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; padding: 20px; }
          h1 { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          tr:hover { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Metadata Changes</h1>
        <table>
          <thead>
            <tr>
              <th>Component Name</th>
              <th>Type</th>
              <th>Modified By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
      </html>
    `;
  }
}
