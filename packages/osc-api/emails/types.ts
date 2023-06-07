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

type emailData = {
    emailId: number;
    message: message;
    contactProperties: {};
    customProperties: {};
};

export type GetEmailData = (input: emailData) => Promise<String>;
export type GetRegEmailData = (input: regEmailData) => Promise<String>;
