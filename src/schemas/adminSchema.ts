import { z } from 'zod';

export const passwordChangeSchema = z.object({
  newPassword: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(10, '비밀번호는 최소 10자 이상이어야 합니다.')
    .refine(password => {
      const validations = {
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };

      const failedValidations = Object.entries(validations)
        .filter(([_, isValid]) => !isValid)
        .map(([key]) => {
          switch (key) {
            case 'hasUpperCase':
              return '영문 대문자';
            case 'hasLowerCase':
              return '영문 소문자';
            case 'hasNumber':
              return '숫자';
            case 'hasSpecialChar':
              return '특수문자';
            default:
              return '';
          }
        });

      if (failedValidations.length > 0) {
        throw new Error(`비밀번호에 ${failedValidations.join(', ')}가 포함되어야 합니다.`);
      }

      return true;
    }),
});
