import type { Meta, Story } from '@storybook/react';
import { mediaQueries as mq } from 'osc-design-tokens';
import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { rem } from '../../utils/rem';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '../Accordion/Accordion';
import { Content } from '../Content/Content';
import { textContent, textContentWithTextColor } from '../Content/textContent';
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

const AccordionContent = () => {
    return (
        <>
            <h2>FAQs</h2>
            <Accordion defaultValue="0" collapsible type="single" variant="primary">
                {Array.from({ length: 6 }).map((_, i) => (
                    <AccordionItem key={i} value={`${i}`}>
                        <AccordionHeader>Lorem ipsum dolor sit</AccordionHeader>
                        <AccordionPanel>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt ipsam
                            temporibus et veniam eveniet dolorum? Eaque alias voluptate quis
                            perferendis repellat omnis temporibus maiores dolores ad, amet, rerum
                            sed nesciunt!
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

const tabs = [
    {
        key: '1',
        list: 'One',
        panel: <Content value={textContent.body} />,
    },
    {
        key: '2',
        list: 'Two',
        panel: <AccordionContent />,
    },
    {
        key: '3',
        list: 'Three',
        panel: <Content value={textContentWithTextColor.body} />,
    },
];

const Template: Story<TabProps> = (args) => {
    return (
        <div className="o-container">
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
                        <div className="o-container">{tab.panel}</div>
                    </TabContent>
                ))}
            </Tabs>
        </div>
    );
};

const ResponsiveTemplate: Story<TabProps> = (args) => {
    const isGreaterThanTab = useMediaQuery(`(min-width: ${rem(mq.tab)}rem)`);

    return (
        <div className="o-container">
            {isGreaterThanTab ? (
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
                            <div className="o-container">{tab.panel}</div>
                        </TabContent>
                    ))}
                </Tabs>
            ) : (
                <Accordion defaultValue={tabs[0].key} type="single" variant="secondary">
                    {tabs.map((tab) => (
                        <AccordionItem key={tab.key} value={`${tab.key}`}>
                            <AccordionHeader>{tab.list}</AccordionHeader>
                            <AccordionPanel>
                                <div className="o-container">{tab.panel}</div>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export const Primary = Template.bind({});
Primary.args = {};

export const TabToAccordion = ResponsiveTemplate.bind({});
TabToAccordion.args = {
    ...Primary.args,
};
TabToAccordion.parameters = {
    docs: {
        description: {
            story: 'You can swap the tabs out for an `Accordion` on smaller viewports by using the `useMediaQuery` hook.',
        },
    },
};
