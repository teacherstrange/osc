import { ChevronRightIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { Props } from './Breadcrumb';
import { Breadcrumb } from './Breadcrumb';

export default {
    title: 'osc-ui/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        docs: {
            description: {
                component:
                    'The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.'
            }
        }
    },
    argTypes: {
        className: {
            description: 'Custom class'
        },
        matches: {
            description: 'An array of objects containing the page titles and pathnames'
        },
        separator: {
            description: 'Custom sparator, can be a string or a component'
        }
    }
} as Meta;

const Template: Story<Props> = (args) => <Breadcrumb {...args} />;

export const Primary = Template.bind({});
export const CustomIcon = Template.bind({});

Primary.args = {
    matches: [
        { pathname: '/courses', title: 'courses' },
        { pathname: '/courses/biology', title: 'biology' },
        { pathname: '/courses/biology/module-1', title: 'module 1' }
    ],
    separator: '/'
};

CustomIcon.args = {
    matches: [
        { pathname: '/qualifications', title: 'qualifications' },
        { pathname: '/qualifications/a-levels', title: 'a-levels' },
        { pathname: '/qualifications/biology/web-development', title: 'web development' },
        {
            pathname: '/qualifications/biology/web-development/course-content',
            title: 'course content'
        }
    ],
    separator: <ChevronRightIcon />
};
CustomIcon.parameters = {
    docs: {
        description: {
            story: 'Uses a component as the separator.'
        }
    }
};
