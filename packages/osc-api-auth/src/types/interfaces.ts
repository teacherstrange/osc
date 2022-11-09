export interface authContext {
    user: {
        id: number;
        permissions: {
            read: [string?];
            write: [string?];
        };
    };
}
