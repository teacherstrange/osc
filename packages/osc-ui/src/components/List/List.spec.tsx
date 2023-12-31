import { render, screen } from '@testing-library/react';
import React from 'react';
import type { ListItemProps } from './List';
import { List, ListItem } from './List';

const items = ['item 1', 'item 2', 'item 3'];
const listItem = items.map((item: ListItemProps<HTMLLIElement>['children'], i: React.Key) => (
    <ListItem key={i}>{item}</ListItem>
));

test('renders a default list of text items', () => {
    render(<List>{listItem}</List>);

    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(list).toBeInTheDocument();

    expect(listItems).toHaveLength(3);

    expect(list).not.toHaveClass('undefined');
    for (const item of listItems) {
        expect(item).not.toHaveClass('undefined');
    }
});

test('renders the unordered type of list items', () => {
    render(<List variant="ul">{listItem}</List>);

    const list = screen.getByRole('list');

    expect(list.nodeName).toBe('UL');
});

test('renders the ordered type of list items', () => {
    render(<List variant="ol">{listItem}</List>);

    const list = screen.getByRole('list');

    expect(list.nodeName).toBe('OL');
});

test('passes classname to the List component', () => {
    render(<List className="test-class">{listItem}</List>);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('test-class');
});

test('passes classname to the ListItem component', () => {
    render(
        <List>
            <ListItem className="test-class">Item 1</ListItem>
            <ListItem>Item 2</ListItem>
        </List>
    );

    // getByRole(listitem, {name: ...}) not finding the element.
    // Seems to be weird workaround: https://stackoverflow.com/questions/63033144/unable-to-use-getbyrole-on-listitem-with-a-specific-name-rtl
    const listItemWithClass = screen
        .getAllByRole('listitem')
        .find((listitem) => listitem.textContent === 'Item 1');

    const listItemWithOutClass = screen
        .getAllByRole('listitem')
        .find((listitem) => listitem.textContent === 'Item 2');

    expect(listItemWithClass).toHaveClass('test-class');
    expect(listItemWithOutClass).not.toHaveClass('test-class');
});
