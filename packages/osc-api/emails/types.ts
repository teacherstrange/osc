type regEmailData = {
    to: string;
    url: string;
    name: string;
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
    name: string;
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

export type GetEmailData = (input: emailData) => Promise<String>;
export type GetRegEmailData = (input: regEmailData) => Promise<String>;
