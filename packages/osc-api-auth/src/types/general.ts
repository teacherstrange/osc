export type userJWT = {
    id: number;
    permissions: {
        read: string[];
        write: string[];
    };
};
