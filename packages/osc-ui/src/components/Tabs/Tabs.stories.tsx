import type { Meta, Story } from '@storybook/react';
import React from 'react';
import type { TabProps } from './Tabs';
import { TabContent, TabList, TabTrigger, Tabs } from './Tabs';

export default {
    title: 'osc-ui/Tabs',
    component: Tabs,
    subcomponents: {
        TabContent,
        TabList,
        TabTrigger,
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A set of layered sections of content — known as tab panels — that are displayed one at a time.',
            },
        },
    },
} as Meta;

const Template: Story<TabProps> = (args) => {
    const tabs = [
        {
            key: '1',
            list: 'One',
            panel: 'one!',
        },
        {
            key: '2',
            list: 'Two',
            panel: 'two!',
        },
        {
            key: '3',
            list: 'Three',
            panel: 'three!',
        },
    ];

    return (
        <Tabs defaultValue={tabs[0].key} {...args}>
            <TabList>
                {tabs.map((tab) => (
                    <TabTrigger value={tab.key} key={tab.key}>
                        {tab.list}
                    </TabTrigger>
                ))}
            </TabList>
            {tabs.map((tab) => (
                <TabContent value={tab.key} key={tab.key}>
                    {tab.panel}
                </TabContent>
            ))}
        </Tabs>
    );
};

export const Primary = Template.bind({});
Primary.args = {};
