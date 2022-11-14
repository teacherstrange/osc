import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql/error';
import jwt from 'jsonwebtoken';
import type { RefreshToken } from '~/types/interfaces';
import { permissions } from './account';

const prisma = new PrismaClient();

export const access = async (userId: number) => {
    const payload = {
        user: { id: userId, permissions: await permissions(userId) }
    };
    // Create accessToken - this is what will be used to access restricted areas
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        algorithm: 'HS256',
        audience: process.env.JWT_AUDIENCE,
        expiresIn: Number(process.env.JWT_DURATION!)
    });
};

export const refresh = async (userId: number) => {
    const payload = { user: { id: userId } };
    const expires = Date.now() + Number(process.env.JWT_REFRESH_DURATION!) * 1000;

    // Generate refreshToken - this will be used to generate a new accessToken without needing to authenticate again
    // Lasts longer than an accessToken, and is stored in the DB so can be deleted to invalidate it for security
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        algorithm: 'HS256',
        audience: process.env.JWT_AUDIENCE,
        expiresIn: Number(process.env.JWT_REFRESH_DURATION!)
    });

    // Store refreshToken
    await prisma.userRefreshToken.create({
        data: {
            userId: userId,
            token: refreshToken,
            expires: new Date(expires).toJSON()
        }
    });

    return refreshToken;
};

export const refreshAccess = async (refreshToken: string) => {
    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!, {
            algorithms: ['HS256'],
            audience: process.env.JWT_AUDIENCE
        }) as RefreshToken;

        const { user } = payload;

        const tokenValid = await prisma.userRefreshToken.findFirst({
            where: {
                userId: user.id,
                token: refreshToken,
                expires: { gt: new Date(Date.now()).toJSON() }
            }
        });

        if (!tokenValid) {
            throw new GraphQLError('Invalid token', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            });
        }

        return await access(user.id);
    } catch (error) {
        throw new GraphQLError(`Invalid token: ${error}`, {
            extensions: {
                code: 'BAD_USER_INPUT'
            }
        });
    }
};
