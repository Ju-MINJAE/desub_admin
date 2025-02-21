export type InputType = 'text' | 'date' | 'select';

interface WithUser {
  user: Record<string, any>;
}

export interface SearchOption<T extends WithUser> {
  value: keyof T | `user.${keyof T['user'] & string}`;
  label: string;
  inputType: InputType;
  options?: { value: string; label: string }[];
}
