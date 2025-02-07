export interface SearchOption<T> {
  value: keyof T;
  label: string;
  inputType: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
  isDateRange?: boolean;
}
