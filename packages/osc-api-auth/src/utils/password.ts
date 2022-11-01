import bcrypt from 'bcrypt';

export const hash = async (password: string) => {
    return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
};

export const compare = async (plainTextPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};
