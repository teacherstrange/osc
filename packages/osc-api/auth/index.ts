import type { UserCanFn } from './types';

export const userCan: UserCanFn = (user, desiredPermission) => {
    // Currently we're taking a single perm to check, or an array of perms that must ALL match
    // If desiredPermission is a string,
    //      THEN see if the desiredPermission exists in users permissoins array
    // ELSE desiredPermission is an array of strings
    //      THEN compare loop through desired permissions, and see if they ALL exist in users permissions
    return typeof desiredPermission == 'string'
        ? user.permissions.read.includes(desiredPermission) ||
              user.permissions.write.includes(desiredPermission)
        : desiredPermission.every(
              (perm) =>
                  user.permissions.write.includes(perm) || user.permissions.read.includes(perm)
          );
};
