import { PrismaClient } from '@prisma/client';
import * as token from '~/utils/token';
import type { CreateUserSocialFn, LoginUserSocialFn } from '~/types/functions';
const prisma = new PrismaClient();

export const createUserSocial: CreateUserSocialFn = async (input) => {
    prisma.userSocial.create({
        data: {
            userId: input.userId,
            socialId: input.socialId,
            type: input.type,
        },
    });
    return true;
};

export const loginUserSocial: LoginUserSocialFn = async (socialId) => {
    const userSocial = await prisma.userSocial.findUnique({
        where: {
            socialId: socialId,
        },
        include: {
            user: true,
        },
    });
    if (!userSocial) {
        return new Error('SSO Login failed');
    }
    const tokens = await token.access(userSocial.userId);
    return tokens;
};
