import type { userJWT } from '~/types/general';

export const userCan = (user: userJWT, desiredPermission: string | []) => {
    console.log(user);
    console.log(desiredPermission);

    return typeof desiredPermission == 'string'
        ? user.permissions.read.includes(desiredPermission) ||
              user.permissions.write.includes(desiredPermission)
        : desiredPermission.every(
              (perm) =>
                  user.permissions.write.includes(perm) || user.permissions.read.includes(perm)
          );
};
