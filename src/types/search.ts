export type InputType = 'text' | 'date' | 'select';

export interface SearchOption<T> {
  value: keyof T;
  label: string;
  inputType: InputType;
  options?: { value: string; label: string }[];
}
