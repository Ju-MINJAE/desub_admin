export interface HeaderItem<T extends string> {
  field?: T;
  label: string;
  type: 'sortable' | 'static';
}
