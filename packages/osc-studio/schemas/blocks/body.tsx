import { colors, fluidScale as sizes } from 'osc-design-tokens';
import type { ReactNode } from 'react';
import { defineType } from 'sanity';

const excludeColors = (key: string) =>
    !key.includes('shadow') &&
    !key.includes('error') &&
    !key.includes('success') &&
    !key.includes('notice') &&
    !key.includes('disabled');

// Create the color decorators
const setColors = () => {
    const colorList = Object.entries(colors.default)
        .filter(([key, value]) => excludeColors(key))
        .map(([key, value]) => {
            if (!value) return null;

            return {
                title: `Colour: ${key}`,
                value: `span u-color-${key}`,

                icon: () => (
                    <div
                        style={{
                            color: key.includes('gradient') ? 'transparent' : (value as string),
                            backgroundImage: key.includes('gradient') ? (value as string) : '',
                            backgroundSize: key.includes('gradient') ? '100%' : '',
                            backgroundRepeat: key.includes('gradient') ? 'repeat' : '',
                            backgroundClip: key.includes('gradient') ? 'text' : '',
                            WebkitBackgroundClip: key.includes('gradient') ? 'text' : '',
                        }}
                    >
                        <strong>T</strong>
                    </div>
                ),
                component: ({ children }: { children: ReactNode }) => (
                    <span
                        style={{
                            color: key.includes('gradient') ? 'transparent' : (value as string),
                            backgroundImage: key.includes('gradient') ? (value as string) : '',
                            backgroundSize: key.includes('gradient') ? '100%' : '',
                            backgroundRepeat: key.includes('gradient') ? 'repeat' : '',
                            backgroundClip: key.includes('gradient') ? 'text' : '',
                            WebkitBackgroundClip: key.includes('gradient') ? 'text' : '',
                        }}
                    >
                        {children}
                    </span>
                ),
            };
        });

    return colorList;
};

const setSizes = () => {
    const sizeList = sizes.steps.map((size: string) => {
        if (!size) return null;

        return {
            title: `Size: ${size}`,
            value: `span t-font-${size}`,
            icon: () => (
                <div>
                    <strong>Aa</strong>
                </div>
            ),
            component: ({ children }: { children: ReactNode }) => (
                <span className={`t-font-${size}`}>{children}</span>
            ),
        };
    });

    return sizeList;
};

export default defineType({
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [
        {
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                annotations: [
                    // Internal link
                    {
                        name: 'annotationLinkInternal',
                        type: 'annotationLinkInternal',
                    },
                    // URL
                    {
                        name: 'annotationLinkExternal',
                        type: 'annotationLinkExternal',
                    },
                    // Email
                    {
                        name: 'annotationLinkEmail',
                        type: 'annotationLinkEmail',
                    },
                ],
                decorators: [
                    {
                        title: 'Italic',
                        value: 'em',
                    },
                    {
                        title: 'Bold',
                        value: 'strong',
                    },
                    {
                        title: 'Semi-bold',
                        value: 'strong u-text-med',
                        icon: () => (
                            <div>
                                <strong>SB</strong>
                            </div>
                        ),
                        component: ({ children }: { children: ReactNode }) => (
                            <span style={{ fontWeight: 500 }}>{children}</span>
                        ),
                    },
                    ...setColors(),
                    ...setSizes(),
                    {
                        title: 'Font: Outfit',
                        value: 'span t-font-primary',
                        icon: () => (
                            <div>
                                <strong>F</strong>
                            </div>
                        ),
                        component: ({ children }: { children: ReactNode }) => (
                            <span className={`t-font-primary`}>{children}</span>
                        ),
                    },
                    {
                        title: 'Font: Judge',
                        value: 'span t-font-secondary',
                        icon: () => (
                            <div>
                                <strong>F</strong>
                            </div>
                        ),
                        component: ({ children }: { children: ReactNode }) => (
                            <span className={`t-font-secondary`}>{children}</span>
                        ),
                    },
                ],
            },
            // Regular styles
            styles: [
                {
                    title: 'Heading 1',
                    value: 'h1',
                },
                {
                    title: 'Heading 2',
                    value: 'h2',
                },
                {
                    title: 'Heading 3',
                    value: 'h3',
                },
                {
                    title: 'Heading 4',
                    value: 'h4',
                },
                {
                    title: 'Heading 5',
                    value: 'h5',
                },
                {
                    title: 'Heading 6',
                    value: 'h6',
                },
            ],
            // Paragraphs
            type: 'block',
        },
        {
            type: 'module.images',
        },
    ],
});
