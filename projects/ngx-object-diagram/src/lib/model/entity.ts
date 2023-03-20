export interface Entity {
  guid: string;
  values: Map<string, unknown>
  collapsed: boolean;
  graphId: string;
}
