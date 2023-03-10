import type { Password, User } from '@prisma/client';

export type { User } from '@prisma/client';

export async function getUserById(id: User['id']) {}

export async function getUserByEmail(email: User['email']) {}

export async function createUser(email: User['email'], password: string) {}

export async function verifyLogin(email: User['email'], password: Password['hash']) {}
