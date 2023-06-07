import { PrismaClient } from '@prisma/client';
import {
    getUserByEmail,
    getUserById,
    wait,
    sendRegistrationEmail,
    getCourseById,
    getRoleById,
    getRoleByTitle,
    sendForgotPasswordEmail,
    getOrgById,
} from 'osc-api';
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
    VerifyLinkFn,
    assignRoleFn,
    CompleteRegistrationFn,
    ResetRequestFn,
    PasswordResetFn,
    AdminCreateUserFn,
} from '~/types/functions';
import type { PermissionsProps } from '~/types/interfaces';
import { env } from '~/types/environment';
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
    // Find role Id
    const roleId = await getRoleByTitle('Student');

    // Assign a role of 'Student'
    if (roleId != null) {
        await assignRole(userCreate.id, roleId.id);
    }
    // Generate magic key token
    const userToken = await token.magicKey(userCreate.id);
    const url = `https://openstudycollege.com/signin?token = ${userToken}`;
    // Send email via hubspot api
    const emailData = {
        to: input.email,
        url: url,
        firstName: input.firstName,
        lastName: input.lastName,
        emailId: env.REG_EMAIL,
    };
    await sendRegistrationEmail(emailData);

    if (input.courses) {
        for (var i = 0; i < input.courses.length; i++) {
            // validation check to make sure course is listed
            const courseExists = await getCourseById(input.courses[i]);
            if (courseExists != null) {
                await prisma.userCourseInterest.create({
                    data: {
                        userId: userCreate.id,
                        courseId: input.courses[i],
                    },
                });
            }
        }
    }
    return userCreate;
};

export const assignRole: assignRoleFn = async (userId, roleId) => {
    // Check if user exists
    const existingUser = await getUserById(userId);
    if (!existingUser) {
        return new Error('An account does not exist for this user');
    }

    // fetch user role
    const userRole = await getRoleById(roleId);
    if (!userRole) {
        return new Error('Role does not exist');
    }
    // Assign user role
    return await prisma.userRole.create({
        data: {
            userId: userId,
            roleId: roleId,
            createdBy: userId,
        },
    });
};

export const verifyLink: VerifyLinkFn = async (magicKeyToken) => {
    // Verfiy the incoming token
    const tokenCheck = await token.verifyToken(magicKeyToken);
    // Get user details for pre pop
    if (!tokenCheck) {
        return new Error('No valid login link');
    }
    const userDet = await get(tokenCheck);
    return userDet;
};

export const completeRegistration: CompleteRegistrationFn = async (input) => {
    const tokenCheck = await token.verifyToken(input.magicKey);
    if (!tokenCheck) {
        return new Error('No valid login link');
    }
    const user = await getUserByEmail(input.email);

    if (!user) {
        return new Error('No matching active user found');
    }

    const hashedPassword = await password.hash(input.password);

    return await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    });
};

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

export const resetRequest: ResetRequestFn = async (email) => {
    const user = await getUserByEmail(email);

    if (!user) {
        return new Error('User is not valid');
    }
    const userToken = await token.magicKey(user.id);
    const url = `https://openstudycollege.com/reset?token = ${userToken}`;
    const emailData = {
        to: email,
        url: url,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: env.FORGOT_EMAIL,
    };
    await sendForgotPasswordEmail(emailData);

    return true;
};

export const passwordReset: PasswordResetFn = async (input) => {
    const tokenCheck = await token.verifyToken(input.magicKeyToken);

    if (!tokenCheck) {
        return new Error('No valid login link');
    }
    // Hash password
    const hashedPassword = await password.hash(input.password);

    //   save new user password
    const update = prisma.user.update({
        where: { id: tokenCheck },
        data: {
            password: hashedPassword,
        },
    });
    return update;
};

export const adminCreateUser: AdminCreateUserFn = async (input) => {
    // Check for existing user, all emails must be unique
    const existingUser = await getUserByEmail(input.email);

    // If user already exists, throw error
    if (existingUser) {
        return new Error('An account already exists for the specified email.');
    }
    // Check role request
    const role = getRoleById(input.roleId);
    if (!role) {
        return new Error('No active role selected');
    }
    // Check Extra Permissions - TODO

    // Check organisation exists
    const org = getOrgById(input.orgId);
    if (!org) {
        return new Error('This organisation does not exist');
    }
    // Hash password
    const hashedPassword = await password.hash(input.password);

    // Create user record
    const user = await prisma.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashedPassword,
        },
    });

    await prisma.userRole.create({
        data: {
            roleId: input.roleId,
            userId: user.id,
            createdBy: input.createdById,
        },
    });

    await prisma.userOrganisation.create({
        data: {
            userId: user.id,
            organisationId: input.orgId,
        },
    });
    return user;
};
