import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { ListItemProps, ListProps, ListTypes } from './List';
import { List, ListItem } from './List';

export default {
    title: 'osc-ui/List',
    component: List,
    subcomponents: { ListItem }
} as Meta;

const Template: Story<ListProps<ListTypes>> = ({ children, ...args }) => (
    <List {...args}>
        {Array.isArray(children)
            ? children.map((child: ListItemProps<HTMLLIElement>['children'], i: React.Key) => (
                  <ListItem key={i}>{child}</ListItem>
              ))
            : null}
    </List>
);

export const Primary = Template.bind({});
Primary.args = {
    children: ['item 1', 'item 2', 'item 3']
};

export const UnorderedList = Template.bind({});
UnorderedList.args = {
    ...Primary.args,
    type: 'ul'
};

export const OrderedList = Template.bind({});
OrderedList.args = {
    ...Primary.args,
    type: 'ol'
};
