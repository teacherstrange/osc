import * as TabPrimitives from '@radix-ui/react-tabs';
import React from 'react';
import { classNames } from '../../utils/classNames';
import './tabs.scss';

export interface Props {
    tabs: {
        key: string;
        list: string;
        panel: string;
    }[];
    className?: string;
}

export const Tabs = (props: Props) => {
    const { tabs, className, ...other } = props;
    const classes = classNames('c-tabs', className);

    return (
        <TabPrimitives.Root className={classes} {...other}>
            <TabPrimitives.List>
                {tabs.map((tab, index) => (
                    <TabPrimitives.Trigger key={tab.key} value={`${index}`}>
                        {tab.list}
                    </TabPrimitives.Trigger>
                ))}
            </TabPrimitives.List>

            {tabs.map((tab, index) => (
                <TabPrimitives.Content key={tab.key} value={`${index}`}>
                    {tab.panel}
                </TabPrimitives.Content>
            ))}
        </TabPrimitives.Root>
    );
};
