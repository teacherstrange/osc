import { render, screen } from '@testing-library/react';
import React from 'react';
import { TabContent, TabList, TabTrigger, Tabs } from './Tabs';

const tabItems = [
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

test('renders the tabs with three items', () => {
    render(
        <Tabs defaultValue={tabItems[0].key}>
            <TabList>
                {tabItems.map((tab) => (
                    <TabTrigger value={tab.key} key={tab.key}>
                        {tab.list}
                    </TabTrigger>
                ))}
            </TabList>

            {tabItems.map((tab) => (
                <TabContent value={tab.key} key={tab.key}>
                    {tab.panel}
                </TabContent>
            ))}
        </Tabs>
    );

    expect(screen.queryAllByRole('tab')).toHaveLength(3);
    // Only expect one to be visible as tab two and three won't get rendered until they are clicked.
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
});
