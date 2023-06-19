export type getPreferenceArgs = {
    readonly id: number;
};

export type getPreferenceByKeyArgs = {
    readonly key: string;
};

export type getUserPreferenceArgs = {
    readonly key: string;
};
export type getUserPreferenceByIdArgs = {
    readonly id: number;
};

export type savePreferenceArgs = {
    readonly input: {
        readonly preferenceId: number;
        readonly value: string;
    };
};

export type savePreferenceByKeyArgs = {
    readonly input: {
        readonly key: string;
        readonly value: string;
    };
};
