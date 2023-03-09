import * as crypto from 'crypto';

export const encryptPassword = (password: string, salt: string): string => {
  return crypto
    .createHmac('sha512', salt)
    .update(password.toString())
    .digest('hex');
};
