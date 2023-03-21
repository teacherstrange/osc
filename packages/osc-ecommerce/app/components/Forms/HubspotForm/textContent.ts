import type { PortableTextBlock } from '@portabletext/types';

interface TextContent {
    formId: string;
    slideDirection?: 'slide-left' | 'slide-right';
    slideOut?: boolean;
    slideOutText?: string;
    submitText: string;
    termsAndConditions?: PortableTextBlock[];
    titleAndDescription?: PortableTextBlock[];
}

export const textContent: TextContent = {
    formId: 'Contact Form',
    slideDirection: 'slide-left',
    slideOut: true,
    slideOutText: 'Contact Us',
    submitText: 'Submit Enquiry',
    termsAndConditions: [
        {
            _key: 'bbcb308f129e',
            _type: 'block',
            children: [
                {
                    _key: 'e422d25f6d8b0',
                    _type: 'span',
                    marks: [],
                    text: 'By completing this form you are expressing interest in Open Study College. We will send you information about our courses and any special offers we think will be useful to you. You will be able to unsubscribe at anytime. See our ',
                },
                {
                    _key: 'f8b246a03851',
                    _type: 'span',
                    marks: ['a048ec6e3bb0'],
                    text: 'Privacy Policy',
                },
                {
                    _key: '28ed29724652',
                    _type: 'span',
                    marks: [],
                    text: '.',
                },
            ],
            markDefs: [
                {
                    _key: 'a048ec6e3bb0',
                    _type: 'annotationLinkExternal',
                    newWindow: true,
                    url: 'https://www.openstudycollege.com/',
                },
            ],
            style: 'normal',
        },
    ],
    titleAndDescription: [
        {
            _key: 'b670e47b7fc8',
            _type: 'block',
            children: [
                {
                    _key: '737e7c9d0866',
                    _type: 'span',
                    marks: [],
                    text: 'Contact Us',
                },
            ],
            markDefs: [],
            style: 'h3',
        },
        {
            _key: '8180faf4223c',
            _type: 'block',
            children: [
                {
                    _key: 'f9adba5b143c0',
                    _type: 'span',
                    marks: [],
                    text: 'Our student advisors are eager to help – call us now on ',
                },
                {
                    _key: '0205078e573a',
                    _type: 'span',
                    marks: ['019dbc381dd4'],
                    text: '0330 822 2686',
                },
                {
                    _key: '6d3af2f74f20',
                    _type: 'span',
                    marks: [],
                    text: '. Alternatively fill out the form below and we’ll get back to you.',
                },
            ],
            markDefs: [
                {
                    _key: '019dbc381dd4',
                    _type: 'annotationLinkExternal',
                    newWindow: true,
                    url: 'tel:0330 822 2686',
                },
            ],
            style: 'normal',
        },
    ],
};
