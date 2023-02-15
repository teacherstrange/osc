import type { Meta, Story } from '@storybook/react';
import React, { Fragment } from 'react';
import { Icon } from '../Icon/Icon';
import type { TextGridProps } from './TextGrid';
import { TextGrid } from './TextGrid';
import data from './textGridData';

export default {
    title: 'osc-ui/TextGrid',
    component: TextGrid,
    parameters: {
        docs: {
            description: {
                component: 'A layout area for displaying text and icons in a 3 x 3 grid.',
            },
        },
    },
} as Meta;

const Template: Story<TextGridProps> = ({ ...args }) => (
    <div
        style={{
            paddingTop: '50px',
            maxWidth: '1200px',
            margin: '0 auto',
        }}
    >
        <TextGrid {...args}>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <Icon id="star" />
                    <div className="c-content">
                        <div className="c-content__inner c-content__inner--left">
                            <h3 className="t-font-m u-text-bold">{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </Fragment>
            ))}
        </TextGrid>
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    heading: 'How an online college works',
};

export const InlineHeading = Template.bind({});
InlineHeading.args = {
    heading: 'How an online college works',
    hasInlineHeading: true,
};
InlineHeading.parameters = {
    docs: {
        description: {
            story: 'Position the heading inline with the content by passing the `hasInlineHeading` prop.',
        },
    },
};
