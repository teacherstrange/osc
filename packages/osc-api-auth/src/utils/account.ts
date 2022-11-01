import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface permissionsProps {
    [key: string]: [string?];
}

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
    console.log(roles);

    for (const role of roles) {
        console.log('role');

        for (const rolePerm of role.details.permissions) {
            permissions[rolePerm.details.level].push(rolePerm.details.key);
        }
    }
    return permissions;
};
