import { PrismaClient } from '@prisma/client';
import type { PermissionsProps } from './types';
import type { UserPermissionsFn } from './types';
const prisma = new PrismaClient();

/**
 * Create a promise which resolves after provided timeout in ms
 *
 * Note that given the js event loop you will never be able to guarantee
 * this timeout too precisely but it should at least be safe to assume
 * "at least this time in ms will have passed"
 */
export const wait = (timeout: number) => {
    return new Promise<void>((resolve) => {
        const wait = setTimeout(() => {
            clearTimeout(wait);
            resolve();
        }, timeout);
    });
};

export const permissions: UserPermissionsFn = async (id: number) => {
    const permissions: PermissionsProps = {
        read: [],
        write: [],
    };
    const roles = await prisma.userRole.findMany({
        where: { userId: id },
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
            userId: id,
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
}