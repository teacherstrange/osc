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

export type createUserArgs = {
    readonly input: createUserInput;
};

export type createUserSetupInput = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
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
