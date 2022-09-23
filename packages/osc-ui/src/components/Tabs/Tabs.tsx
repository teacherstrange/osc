import type { FC } from 'react';
import React from 'react';
import { Tabs as ChakraTabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import './tabs.css';

export interface Props {
    tabs: {
        key: string;
        list: string;
        panel: string;
    }[];
    className?: string;
}

export const Tabs: FC<Props> = (props: Props) => {
    const { tabs, className, ...other } = props;

    return (
        <ChakraTabs className={`o-tabs ${className}`} {...other}>
            <TabList>
                {tabs.map((tab) => (
                    <Tab key={tab.key}>{tab.list}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {tabs.map((tab) => (
                    <TabPanel key={tab.key}>{tab.panel}</TabPanel>
                ))}
            </TabPanels>
        </ChakraTabs>
    );
};
