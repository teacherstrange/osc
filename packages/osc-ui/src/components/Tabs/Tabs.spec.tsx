/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { Tabs } from './Tabs';
import { screen, render } from '@testing-library/react';

const tabItems = [
    {
        key: '1',
        list: 'One',
        panel: 'one!'
    },
    {
        key: '2',
        list: 'Two',
        panel: 'two!'
    },
    {
        key: '3',
        list: 'Three',
        panel: 'three!'
    }
];

test('renders the tabs with three items', () => {
    render(<Tabs tabs={tabItems} />);

    const tabList = screen.queryAllByRole('tab');
    // Use querySelector as an escape hatch as queryByRole won't count hidden elements
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    const tabContainer = document.querySelector('.chakra-tabs');

    expect(tabList).toHaveLength(3);
    expect(tabPanels).toHaveLength(3);
    expect(tabContainer).not.toHaveClass('undefined');
});

test('passes classname to the component', () => {
    render(<Tabs tabs={tabItems} className="testClass" />);

    const tabContainer = document.querySelector('.testClass');
    expect(tabContainer).toBeInTheDocument();
});
