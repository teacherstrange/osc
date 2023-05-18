import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql/error';
import jwt from 'jsonwebtoken';
import { env } from '~/types/environment';
import type { AccessTokenFn, RefreshAccessFn, RefreshTokenFn, MagicKeyTokenFn, VerifyFn } from '~/types/functions';
import type { RefreshToken, MagicToken } from '~/types/interfaces';
import { permissions } from './account';

const prisma = new PrismaClient();

export const magicKey: MagicKeyTokenFn = async (userId) => {
    const payload = {
        user: { id: userId, permissions: await permissions(userId) }
    };
    // Magic key token set to expire after 1h
    return jwt.sign(payload, env.JWT_SECRET!, {
        algorithm: 'HS256',
        audience: env.JWT_AUDIENCE,
        expiresIn: 10800
    });
}

export const access: AccessTokenFn = async (userId) => {
    const payload = {
        user: { id: userId, permissions: await permissions(userId) }
    };

    // Create accessToken - this is what will be used to access restricted areas
    return jwt.sign(payload, env.JWT_SECRET!, {
        algorithm: 'HS256',
        audience: env.JWT_AUDIENCE,
        expiresIn: Number(env.JWT_DURATION!)
    });
};

export const refresh: RefreshTokenFn = async (userId) => {
    const payload = { user: { id: userId } };
    const expires = Date.now() + Number(env.JWT_REFRESH_DURATION!) * 1000;

    // Generate refreshToken - this will be used to generate a new accessToken without needing to authenticate again
    // Lasts longer than an accessToken, and is stored in the DB so can be deleted to invalidate it for security
    const refreshToken = jwt.sign(payload, env.JWT_SECRET!, {
        algorithm: 'HS256',
        audience: env.JWT_AUDIENCE,
        expiresIn: Number(env.JWT_REFRESH_DURATION!)
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

export const refreshAccess: RefreshAccessFn = async (refreshToken) => {
    try {
        const payload = jwt.verify(refreshToken, env.JWT_SECRET!, {
            algorithms: ['HS256'],
            audience: env.JWT_AUDIENCE
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

        return { accessToken: await access(user.id) };
    } catch (error) {
        return new Error(`Invalid token: ${error}`);
    }
};

export const verifyToken: VerifyFn = async (magicKeyToken) => {
    try {
        const decoded = jwt.verify(magicKeyToken, env.JWT_SECRET!, {
            algorithms: ['HS256'],
            audience: env.JWT_AUDIENCE
        }) as MagicToken

        if (decoded == undefined) {
            return 'Fail';
        }
        const { user } = decoded;
        return user.id;

    } catch (error) {
        return 'Fail';
    }
}
