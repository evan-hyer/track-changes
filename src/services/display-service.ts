import {MetadataChange} from './query-service.js';

export class DisplayService {
  public formatJson(changes: MetadataChange[]): string {
    throw new Error(`Not implemented: ${changes.length}`);
  }

  public formatTableData(changes: MetadataChange[]): MetadataChange[] {
    throw new Error(`Not implemented: ${changes.length}`);
  }

  public display(changes: MetadataChange[], json: boolean): void {
    throw new Error(`Not implemented: ${changes.length}, ${json}`);
  }
}
