export type getUsersArgs = {
    orderBy: 'id' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'lastLogin';
    orderDir: 'asc' | 'desc';
    start: number;
    limit: number;
    cursor: number | null;
    pagination: 'offset' | 'cursor';
};
export type getUserArgs = {
    id: number | null;
};
export type createUserArgs = {
    input: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
};
export type loginArgs = {
    email: string;
    password: string;
};
