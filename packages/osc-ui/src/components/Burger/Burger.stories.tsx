import type { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import type { BurgerProps } from './Burger';
import { Burger } from './Burger';

export default {
    title: 'osc-ui/Burger',
    component: Burger,
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as Meta;

const Template: Story<BurgerProps> = (args) => <Burger {...args} />;

const ControlledTemplate: Story<BurgerProps> = (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Burger
            onClick={() => {
                setIsOpen(!isOpen);
            }}
            isOpen={isOpen}
            {...args}
        />
    );
};

export const Primary = Template.bind({});
Primary.args = {
    label: 'Open menu',
};

export const IsOpen = Template.bind({});
IsOpen.args = {
    ...Primary.args,
    isOpen: true,
};

export const IsControlled = ControlledTemplate.bind({});
IsControlled.args = {
    ...Primary.args,
};
