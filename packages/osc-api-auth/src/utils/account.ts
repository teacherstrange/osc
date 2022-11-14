import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql/error';
import type { createUserInput, loginArgsInput } from '~/types/arguments';
import type { PermissionsProps } from '~/types/interfaces';
import * as password from '~/utils/password';
import * as token from '~/utils/token';

const prisma = new PrismaClient();

export const create = async (input: createUserInput) => {
    // Check for existing user, all emails must be unique
    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    });

    // If user already exists, throw error
    if (existingUser) {
        throw new GraphQLError('An account already exists for the specified email.', {
            extensions: {
                code: 'BAD_USER_INPUT'
            }
        });
    }

    // Hash password
    const hashedPassword = await password.hash(input.password);

    // Create user record
    return await prisma.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashedPassword
        }
    });
};

export const login = async (input: loginArgsInput) => {
    // Find matching user
    const user = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    });

    // If no matching user, throw error
    if (!user) {
        throw new GraphQLError('No matching user found.', {
            extensions: {
                code: 'BAD_USER_INPUT'
            }
        });
    }

    // Compare input password to hashed password
    const passwordMatch = await password.compare(input.password, user.password);

    // If passwords dont match throw error
    // We'll hide this behind the same text as no matching user for now to prevent identifying used emails
    if (!passwordMatch) {
        throw new GraphQLError('No matching user found.', {
            extensions: {
                code: 'BAD_USER_INPUT'
            }
        });
    }

    // Generate tokens - this is what will be used to access restricted areas, and refresh an expired token
    const accessToken = token.access(user.id);
    const refreshToken = token.refresh(user.id);

    return { accessToken, refreshToken };
};

export const refreshAccess = async (refreshToken: string) => {
    return { accessToken: await token.refreshAccess(refreshToken) };
};

export const get = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    });
};

export const profile = async (id: number) => {
    return {
        avatar: await avatar(id),
        permissions: await permissions(id),
        roles: await roles(id),
        crmTokens: await crmTokens(id),
        lmsTokens: await lmsTokens(id)
    };
};

export const permissions = async (userId: number) => {
    const permissions: PermissionsProps = {
        read: [],
        write: []
    };

    const roles = await prisma.userRole.findMany({
        where: { userId: userId },
        include: {
            details: {
                include: {
                    permissions: {
                        include: {
                            details: true
                        }
                    }
                }
            }
        }
    });

    for (const role of roles) {
        for (const rolePerm of role.details.permissions) {
            if (!permissions[rolePerm.details.level].includes(rolePerm.details.key)) {
                permissions[rolePerm.details.level].push(rolePerm.details.key);
            }
        }
    }

    const extraPerms = await prisma.extraPermission.findMany({
        where: {
            userId: userId
        },
        include: {
            details: true
        }
    });

    for (const perm of extraPerms) {
        if (!permissions[perm.details.level].includes(perm.details.key)) {
            permissions[perm.details.level].push(perm.details.key);
        }
    }

    return permissions;
};

const roles = async (id: number) => {
    return await prisma.userRole.findMany({
        where: { userId: id },
        include: {
            details: true
        }
    });
};

const avatar = async (id: number) => {
    return await prisma.userAvatar.findUnique({
        where: {
            userId: id
        }
    });
};

const crmTokens = async (id: number) => {
    return await prisma.crmToken.findMany({
        where: {
            userId: id
        },
        include: {
            crm: true
        }
    });
};

export const lmsTokens = async (id: number) => {
    return await prisma.lmsToken.findMany({
        where: {
            userId: id
        },
        include: {
            lms: true
        }
    });
};
