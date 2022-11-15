import { ChevronRightIcon } from '@radix-ui/react-icons';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { Props } from './Breadcrumb';
import { Breadcrumb } from './Breadcrumb';

export default {
    title: 'osc-ui/Breadcrumb',
    component: Breadcrumb
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
