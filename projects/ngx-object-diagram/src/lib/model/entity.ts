export interface Entity {
  guid: string;
  values: Record<string, unknown>
  collapsed: boolean;
}
