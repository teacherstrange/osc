export interface PermissionsProps {
    readonly [key: string]: string[];
}

export type UserPermissionsFn = (userId: number) => Promise<PermissionsProps>;
