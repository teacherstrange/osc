import bcrypt from 'bcrypt';
import { env } from '~/types/environment';

export const hash = async (password: string) => {
    return await bcrypt.hash(password, Number(env.SALT_ROUNDS));
};

export const compare = async (plainTextPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};
