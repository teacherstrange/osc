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

export type createUserInput = {
    readonly email: string;
    readonly orgId: number;
    readonly roles: number[];
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly extraPermissions: number[];
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

export type tutorCourseInput = {
    readonly courseId: number;
    readonly iv: boolean;
};

export type createTutorInput = {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly course: [tutorCourseInput];
    readonly IVUser: boolean;
};

export type createTutorArgs = {
    readonly input: createTutorInput;
};

export type courseAccept = {
    readonly courseId: number;
    readonly accept: boolean;
};

export type completeTutorCreate = {
    readonly email: string;
    readonly password: string;
    readonly magicKey: string;
    readonly courses: [courseAccept];
};
export type completeTutorArgs = {
    readonly input: completeTutorCreate;
};

export type markUserAsIVArgs = {
    readonly userId: number;
};

export type createUserSocialInput = {
    readonly userId: number;
    readonly name: string;
    readonly ssoId: string;
};

export type socialLoginCreateArgs = {
    readonly input: createUserSocialInput;
};
export type socialLoginArgs = {
    readonly ssoId: string;
};
