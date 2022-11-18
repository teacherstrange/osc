import { PrismaClient } from '@prisma/client';
import type {
    CreateUserFn,
    CrmTokensFn,
    GetMultipleUsersFn,
    GetUserFn,
    LmsTokensFn,
    LoginFn,
    RefreshAccessFn,
    UserAvatarFn,
    UserPermissionsFn,
    UserProfileFn,
    UserRolesFn
} from '~/types/functions';
import type { PermissionsProps } from '~/types/interfaces';
import { wait } from '~/utils';
import * as password from '~/utils/password';
import * as token from '~/utils/token';

const prisma = new PrismaClient();

export const create: CreateUserFn = async (input) => {
    // Check for existing user, all emails must be unique
    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    });

    // If user already exists, throw error
    if (existingUser) {
        return new Error('An account already exists for the specified email.');
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

export const login: LoginFn = async (input) => {
    // Find matching user
    const user = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    });

    // If no matching user, throw error
    if (!user) {
        await wait(3000);
        return new Error('No matching user found.');
    }

    // Compare input password to hashed password
    const passwordMatch = await password.compare(input.password, user.password);

    // If passwords dont match throw error
    // We'll hide this behind the same text as no matching user for now to prevent identifying used emails
    if (!passwordMatch) {
        await wait(3000);
        return new Error('No matching user found.');
    }

    // Generate tokens - this is what will be used to access restricted areas, and refresh an expired token
    const accessToken = token.access(user.id);
    const refreshToken = token.refresh(user.id);

    return { accessToken, refreshToken };
};

export const refreshAccess: RefreshAccessFn = async (refreshToken) => {
    return await token.refreshAccess(refreshToken);
};

export const get: GetUserFn = async (userId) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
};

export const getMultiple: GetMultipleUsersFn = async (args) => {
    const {
        start = 0,
        limit = 50,
        cursor = null,
        pagination = 'offset',
        orderBy = 'firstName',
        orderDir = 'asc'
    } = args;

    if (pagination == 'cursor' && cursor) {
        return await prisma.user.findMany({
            skip: 1,
            take: limit,
            cursor: {
                id: cursor
            },
            orderBy: {
                [orderBy]: orderDir
            }
        });
    }

    return await prisma.user.findMany({
        skip: start,
        take: limit,
        orderBy: {
            [orderBy]: orderDir
        }
    });
};

export const profile: UserProfileFn = async (userId) => {
    return {
        avatar: await avatar(userId),
        permissions: await permissions(userId),
        roles: await roles(userId),
        crmTokens: await crmTokens(userId),
        lmsTokens: await lmsTokens(userId)
    };
};

export const permissions: UserPermissionsFn = async (userId) => {
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

const roles: UserRolesFn = async (userId) => {
    return await prisma.userRole.findMany({
        where: { userId: userId },
        include: {
            details: true
        }
    });
};

const avatar: UserAvatarFn = async (userId) => {
    return await prisma.userAvatar.findUnique({
        where: {
            userId: userId
        }
    });
};

const crmTokens: CrmTokensFn = async (userId) => {
    return await prisma.crmToken.findMany({
        where: {
            userId: userId
        },
        include: {
            crm: true
        }
    });
};

export const lmsTokens: LmsTokensFn = async (userId) => {
    return await prisma.lmsToken.findMany({
        where: {
            userId: userId
        },
        include: {
            lms: true
        }
    });
};
