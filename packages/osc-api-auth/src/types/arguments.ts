export type getUsersArgs = {
    readonly orderBy: 'id' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'lastLogin';
    readonly orderDir: 'asc' | 'desc';
    readonly start: number;
    readonly limit: number;
    readonly cursor: number;
    readonly pagination: 'offset' | 'cursor';
};

export type getUserArgs = {
    readonly id?: number;
};

export type createUserInput = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
};

export type completeRegistration = {
    readonly email: string;
    readonly password: string;
    readonly magicKey: string;
}

export type completeRegistrationArgs = {
    readonly input: completeRegistration;
}

export type createUserArgs = {
    readonly input: createUserInput;
};

export type createUserSetupInput = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly courses: [];
}

export type createUserSetupArgs = {
    readonly input: createUserSetupInput;
}

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
}
