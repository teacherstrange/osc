export type userJWT = {
    id: number;
    permissions: {
        read: string[];
        write: string[];
    };
};

export type refreshTokenUser = {
    id: number;
};
