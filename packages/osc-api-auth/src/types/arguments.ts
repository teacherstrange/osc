export type getUsersArgs = {
    readonly orderBy: 'id' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'lastLogin';
    readonly orderDir: 'asc' | 'desc';
    readonly start: number;
    readonly limit: number;
    readonly cursor: number;
    readonly pagination: 'offset' | 'cursor';
};

export type getPermissionsArgs = {
    readonly orderBy: 'id' | 'title';
    readonly orderDir: 'asc' | 'desc';
    readonly limit: number;
    readonly pagination: 'offset' | 'cursor';
};

export type getUserArgs = {
    readonly id?: number;
};

export type completeRegistration = {
    readonly email: string;
    readonly password: string;
    readonly magicKey: string;
};

export type completeRegistrationArgs = {
    readonly input: completeRegistration;
};

export type createUserArgs = {
    readonly input: createUserInput;
};

export type createUserSetupInput = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly courses: [];
};

export type createUserSetupArgs = {
    readonly input: createUserSetupInput;
};

export type loginArgsInput = {
    readonly email: string;
    readonly password: string;
};

export type loginArgs = {
    readonly input: loginArgsInput;
};

export type refreshAccessArgs = {
    readonly refreshToken: string;
};

export type magicKeyArgs = {
    readonly magicKeyToken: string;
};

export type passwordResetInput = {
    readonly magicKeyToken: string;
    readonly password: string;
};

export type ResetRequestArgs = {
    readonly email: string;
};

export type completeResetPasswordArgs = {
    readonly input: passwordResetInput;
};
