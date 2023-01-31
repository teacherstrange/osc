import { Button as OSCButton, CopyButton } from 'osc-ui';
import type { buttonModule } from '~/types/sanity';

type Props = {
    button: buttonModule;
    isFull?: boolean;
};

export const Button = (props: Props) => {
    const { button, isFull, ...rest } = props;

    const { _key, email, externalLink, file, label, slug, telephone, type, textToCopy } = button;

    switch (type) {
        case 'file':
            return file ? (
                <OSCButton key={_key} as="a" href={file} download {...rest}>
                    {label}
                </OSCButton>
            ) : null;

        case 'email':
            return email ? (
                <OSCButton key={_key} as="a" href={`mailto:${email}`} {...rest}>
                    {label}
                </OSCButton>
            ) : null;

        case 'telephone':
            return telephone ? (
                <OSCButton key={_key} as="a" href={`tel:${telephone}`} {...rest}>
                    {label}
                </OSCButton>
            ) : null;

        case 'external':
            return externalLink?.url ? (
                <OSCButton
                    key={_key}
                    as="a"
                    href={externalLink?.url}
                    target={externalLink?.newWindow ? '_blank' : '_self'}
                    {...rest}
                >
                    {label}
                </OSCButton>
            ) : null;

        case 'internal':
            return slug ? (
                <OSCButton key={_key} as="link" to={slug} {...rest}>
                    {label}
                </OSCButton>
            ) : null;

        case 'copy to clipboard':
            return textToCopy ? (
                <CopyButton key={_key} textToCopy={textToCopy} {...rest}>
                    {label}
                </CopyButton>
            ) : null;

        default:
            return (
                <OSCButton key={_key} {...rest}>
                    {label}
                </OSCButton>
            );
    }
};
