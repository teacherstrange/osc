import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from './Modal';
import { OSCModal as Modal } from './Modal';

export default {
    title: 'osc-ui/Modal',
    component: Modal
} as Meta;

const Template: Story<Props> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    children: <p>hello world</p>,
    ModalButtonText: 'Click to open',
    title: 'whats up',
    size: 'xs',
    hideHeaderCloseButton: false,
    hideFooterCloseButton: false,
    disableOutsideClick: false,
    overlayColour: 'grey',
    primaryActionButton: false,
    primaryActionButtonText: 'click me',
    onClick: () => {
        alert('modal cliked');
    }
};

export const Sm = Template.bind({});
Sm.args = {
    ...Primary.args,
    size: 'sm'
};
export const Md = Template.bind({});
Md.args = {
    ...Primary.args,
    size: 'md'
};

export const Lg = Template.bind({});
Lg.args = {
    ...Primary.args,
    size: 'lg'
};

export const Xl = Template.bind({});
Xl.args = {
    ...Primary.args,
    size: 'xl'
};

export const Full = Template.bind({});
Full.args = {
    ...Primary.args,
    size: 'full'
};
