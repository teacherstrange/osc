import { PrismaClient } from '@prisma/client';
import { getUserByEmail, getUserById, wait, sendEmail } from 'osc-api';
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
    UserRolesFn,
    CreateUserSetupFn,
    VerifyLinkFn

} from '~/types/functions';
import type { PermissionsProps } from '~/types/interfaces';
import * as password from '~/utils/password';
import * as token from '~/utils/token';

const prisma = new PrismaClient();

export const create: CreateUserFn = async (input) => {
    // Check for existing user, all emails must be unique
    const existingUser = await getUserByEmail(input.email);

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
            password: hashedPassword,
        },
    });
};
export const createSetup: CreateUserSetupFn = async (input) => {
    const existingUser = await getUserByEmail(input.email);

    // If user already exists, throw error
    if (existingUser) {
        return new Error('An account already exists for the specified email.');
    }
    // Create user record
    const userCreate = await prisma.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
        },
    });
    // Generate magic key token
    const userToken = await token.magicKey(userCreate.id);
    const url = `https://openstudycollege.com/signin?token = ${userToken}`;
    const sendId = Date.now().toString();
    // Send email via hubspot api
    const emailData = { 'token': userToken, 'to': "jonathan.hall@openstudycollege.com", 'from': "jonathan.hall@openstudycollege.com", 'emailId': 69285064430, 'url': url, 'sendId': sendId }
    await sendEmail(emailData);
    if (input.courses) {
        for (var i = 0; i < input.courses.length; i++) {
            await prisma.userCourseInterest.create({
                data: {
                    userId: userCreate.id,
                    courseId: (input.courses[i])
                }
            })
        }
    }
    return userCreate;
}

export const verifyLink: VerifyLinkFn = async (magicKeyToken) => {
    // Verfiy the incoming token
    const tokenCheck = await token.verifyToken(magicKeyToken);
    // Get user details for pre pop
    if (tokenCheck == 'Fail') {
        return new Error('No valid login link')
    }
    const userDet = await get(tokenCheck);
    return userDet;

}

export const login: LoginFn = async (input) => {
    // Find matching user
    const user = await getUserByEmail(input.email);

    // If no matching user, throw error
    if (!user) {
        await wait(3000);
        return new Error('No matching active user found.');
    }

    // Compare input password to hashed password
    if (user.password == null) {
        return new Error('No matching user found.');
    }
    const passwordMatch = await password.compare(input.password, user.password);
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
    return await getUserById(userId);
};

export const getMultiple: GetMultipleUsersFn = async (args) => {
    const {
        start = 0,
        limit = 50,
        cursor = null,
        pagination = 'offset',
        orderBy = 'firstName',
        orderDir = 'asc',
    } = args;

    if (pagination == 'cursor' && cursor) {
        return await prisma.user.findMany({
            skip: 1,
            take: limit,
            cursor: {
                id: cursor,
            },
            orderBy: {
                [orderBy]: orderDir,
            },
        });
    }

    return await prisma.user.findMany({
        skip: start,
        take: limit,
        orderBy: {
            [orderBy]: orderDir,
        },
    });
};

export const profile: UserProfileFn = async (userId) => {
    return {
        avatar: await avatar(userId),
        permissions: await permissions(userId),
        roles: await roles(userId),
        crmTokens: await crmTokens(userId),
        lmsTokens: await lmsTokens(userId),
    };
};

export const permissions: UserPermissionsFn = async (userId) => {
    const permissions: PermissionsProps = {
        read: [],
        write: [],
    };

    const roles = await prisma.userRole.findMany({
        where: { userId: userId },
        include: {
            details: {
                include: {
                    permissions: {
                        include: {
                            details: true,
                        },
                    },
                },
            },
        },
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
            userId: userId,
        },
        include: {
            details: true,
        },
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
            details: true,
        },
    });
};

const avatar: UserAvatarFn = async (userId) => {
    return await prisma.userAvatar.findUnique({
        where: {
            userId: userId,
        },
    });
};

const crmTokens: CrmTokensFn = async (userId) => {
    return await prisma.crmToken.findMany({
        where: {
            crmUser: {
                userId,
            },
        },
        include: {
            crmUser: true,
        },
    });
};

export const lmsTokens: LmsTokensFn = async (userId) => {
    return await prisma.lmsToken.findMany({
        where: {
            lmsUser: {
                userId,
            },
        },
        include: {
            lmsUser: true,
        },
    });
};
