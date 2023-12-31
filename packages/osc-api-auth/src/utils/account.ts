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
    getAllPermissions,
    sendTutorCreateEmail,
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
    GetAllPermissionsFn,
    CreateTutorFn,
    CreateTutorCompleteFn,
    ValidateTutorFn,
    MarkAsIVFn,
    UpdatePasswordFn,
    UpdatePasswordFromOrderFn,
} from '~/types/functions';
import type { PermissionsProps } from '~/types/interfaces';
import { env } from '~/types/environment';
import * as password from '~/utils/password';
import * as token from '~/utils/token';

const prisma = new PrismaClient();

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

    const userUpdate = UpdatePassword({ userId: user.id, password: input.password });
    return userUpdate;
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

    // Update password
    const update = await UpdatePassword({ userId: tokenCheck, password: input.password });
    return update;
};

export const validateFromOrder: VerifyLinkFn = async (magicKeyToken) => {
    // Verify the incoming token
    const tokenCheck = await token.verifyToken(magicKeyToken);
    if (!tokenCheck) {
        return new Error('No valid link');
    }
    // Send back user details - Will need to add more details at a later date
    const user = await get(tokenCheck);
    return user;
};

export const UpdatePassword: UpdatePasswordFn = async (input) => {
    const hashedPassword = await password.hash(input.password);
    const update = await prisma.user.update({
        where: { id: input.userId },
        data: {
            password: hashedPassword,
        },
    });
    return update;
};

export const create: CreateUserFn = async (input, userId) => {
    // Check for existing user, all emails must be unique
    const existingUser = await getUserByEmail(input.email);
    // If user already exists, throw error
    if (existingUser) {
        return new Error('An account already exists for the specified email.');
    }
    // Validate the data - org and roles
    // Check organisation exists
    const org = getOrgById(input.orgId);
    if (!org) {
        return new Error('This organisation does not exist');
    }

    const hashedPassword = await password.hash(input.password);
    // Create user record
    const user = await prisma.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashedPassword,
            createdBy: userId,
        },
    });
    // Link User to organisation
    await prisma.userOrganisation.create({
        data: {
            userId: user.id,
            organisationId: input.orgId,
        },
    });
    for (var i = 0; i < input.roles.length; i++) {
        // Check role request
        const role = getRoleById(input.roles[i]);
        if (role != null) {
            // Create User Role
            await prisma.userRole.create({
                data: {
                    roleId: input.roles[i],
                    userId: user.id,
                    createdBy: userId,
                },
            });
        }
    }
    // Loop through extra permissions
    for (var j = 0; j < input.extraPermissions.length; j++) {
        await prisma.extraPermission.create({
            data: {
                userId: user.id,
                permissionId: input.extraPermissions[i],
                createdBy: userId,
            },
        });
    }
    return user;
};

export const getAllUserPermissions: GetAllPermissionsFn = async () => {
    return await getAllPermissions();
};

export const markAsIV: MarkAsIVFn = async (userId, createdBy) => {
    // Checks for IV role
    const ivRole = await getRoleByTitle('IV');
    if (!ivRole) {
        return new Error('Unable to find IV role');
    }
    return await prisma.userRole.create({
        data: {
            userId: userId,
            roleId: ivRole.id,
            createdBy: createdBy,
        },
    });
};

export const createTutor: CreateTutorFn = async (input, createdBy) => {
    // Check for existing user, all emails must be unique
    const existingUser = await getUserByEmail(input.email);

    // If user already exists, throw error
    if (existingUser) {
        return new Error('An account already exists for the specified email.');
    }
    // Check role exists
    const tutorRole = await getRoleByTitle('Tutor');
    if (!tutorRole) {
        return new Error('Unable to verify role');
    }
    // Create tutor record
    const user = await prisma.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
        },
    });
    //Assign tutor user role
    await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: tutorRole.id,
            createdBy: createdBy,
        },
    });
    if (input.IVUser == true) {
        await markAsIV(user.id, createdBy);
    }
    for (var i = 0; i < input.course.length; i++) {
        await prisma.courseTutor.create({
            data: {
                tutorId: user.id,
                courseId: input.course[i].courseId,
                createdBy: createdBy,
                iv: input.course[i].iv ?? false,
            },
        });
    }
    // Generate magic link
    const userToken = await token.magicKey(user.id);
    const url = `https://openstudycollege.com/tutorcreate?token = ${userToken}`;

    // Send email
    const emailData = {
        to: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        url: url,
        emailId: env.TUTOR_CREATE_EMAIL,
    };
    await sendTutorCreateEmail(emailData);
    return user;
};

export const completeTutorCreate: CreateTutorCompleteFn = async (input) => {
    const complete = {
        magicKey: input.magicKey,
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
    };

    const registration = await completeRegistration(complete);
    const user = await getUserByEmail(input.email);

    if (user) {
        const coursesAssigned = await prisma.courseTutor.findMany({
            where: {
                tutorId: user.id,
            },
        });
        // Compare coursesAssigned with accepted array
        const deleteArray: number[] = [];

        for (var i = 0; i < coursesAssigned.length; i++) {
            let check = 0;
            for (var j = 0; j < input.courses.length; j++) {
                if (input.courses[j].courseId === coursesAssigned[i].courseId) {
                    input.courses.splice(j, 1);
                    j--;
                    check = 1;
                }
            }
            if (check == 0) {
                deleteArray.push(coursesAssigned[i].courseId);
            }
        }
        await prisma.courseTutor.deleteMany({
            where: {
                tutorId: user.id,
                courseId: {
                    in: deleteArray,
                },
            },
        });
    }
    return registration;
};

export const validateTutor: ValidateTutorFn = async (magicKey) => {
    const verified = await token.verifyToken(magicKey);
    if (!verified) {
        return new Error('Tutor not valid');
    }
    // Get Courses assigned for tutor to check
    return await prisma.courseTutor.findMany({
        where: {
            tutorId: verified,
        },
        include: {
            course: true,
        },
    });
};

export const UpdatePasswordFromOrder: UpdatePasswordFromOrderFn = async (input) => {
    // Verify incoming token
    const tokenCheck = await token.verifyToken(input.magicKeyToken);
    if (!tokenCheck) {
        return new Error('No valid link');
    }
    // Update password
    const user = await UpdatePassword({ userId: tokenCheck, password: input.password });
    return user;
};
