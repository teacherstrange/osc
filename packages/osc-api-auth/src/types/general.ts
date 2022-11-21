export type userJWT = {
    readonly id: number;
    readonly permissions: {
        read: string[];
        write: string[];
    };
};

export type refreshTokenUser = {
    readonly id: number;
};
