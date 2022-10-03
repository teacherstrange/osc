import type { Meta, Story } from '@storybook/react';
import React from 'react';
import { List } from './List';
import type { Props as ListProps } from './List';
import { ListItem } from './ListItem';
import type { Props as ListItemProps } from './ListItem';

export default {
    title: 'List',
    component: List,
    subcomponents: { ListItem }
} as Meta;

const Template: Story<ListProps> = ({ children, ...args }) => (
    <List {...args}>
        {Array.isArray(children)
            ? children.map((child: ListItemProps['children'], i: React.Key) => (
                  <ListItem {...args} key={i}>
                      {child}
                  </ListItem>
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
