import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface permissionsProps {
    [key: string]: [string?];
}

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
    const permissions: permissionsProps = {
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
