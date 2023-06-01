import { PrismaClient } from '@prisma/client';
import type { PermissionsProps } from '~/types/interfaces';
import type { UserPermissionsFn } from '~/types/functions';
const prisma = new PrismaClient();

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