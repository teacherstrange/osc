type regEmailData = {
    to: string;
    url: string;
    firstName: string;
    lastName: string;
    emailId: number;
};

type message = {
    to: string;
    from?: string;
    sendId: string;
    cc?: string[];
    bcc?: string[];
    replyTo?: string[];
};

type contact = {
    firstname: string;
    lastname: string;
};

type custom = {
    name: string;
    url: string;
};

type emailData = {
    emailId: number;
    message: message;
    contactProperties: contact;
    customProperties: custom;
};

export type GetEmailData = (input: emailData) => Promise<Boolean | Error>;
export type GetRegEmailData = (input: regEmailData) => Promise<Boolean | Error>;
