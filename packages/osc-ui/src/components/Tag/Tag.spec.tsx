import { render, screen } from '@testing-library/react';
import React from 'react';
import type { Props } from './Tag';
import { Tag } from './Tag';

import { PlusIcon } from '@radix-ui/react-icons';
import { Avatar } from '../Avatar/Avatar';

// Get children nodes from span
const getChildrenNodes = (container) => container.querySelectorAll('span')[0].childNodes;

describe('Tag component', () => {
    const setup = ({ tagName, className, customElement, icon, iconPosition, theme }: Props) =>
        render(
            <Tag
                tagName={tagName}
                className={className}
                customElement={customElement}
                icon={icon}
                iconPosition={iconPosition}
                theme={theme}
            />
        );
    test('renders a tag with the correct name', () => {
        setup({ tagName: 'Default', theme: 'primary' });
        expect(screen.getByText('Default')).toHaveTextContent('Default');
    });
    test('passes correct classNames to Tag component', () => {
        setup({
            tagName: 'Default',
            theme: 'primary',
            className: 'test-class-1 test-class-2'
        });
        expect(screen.getByText('Default').closest('div > span')).toHaveClass(
            'test-class-1 test-class-2'
        );
    });
    test('renders an svg when passed an icon and icon position', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'left',
            icon: <PlusIcon />,
            theme: 'primary'
        });
        expect(container.querySelectorAll('svg').length).toBe(1);
    });
    test('renders an svg to the left of the text when icon position is set to "left"', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'left',
            icon: <PlusIcon />,
            theme: 'primary'
        });

        const result = getChildrenNodes(container);
        // Check whether first child is an SVG
        expect(result[0].nodeName).toBe('svg');
    });
    test('renders an svg to the right of the text when icon position is set to "right"', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'right',
            icon: <PlusIcon />,
            theme: 'primary'
        });
        const result = getChildrenNodes(container);
        // Check whether second child is an SVG
        expect(result[1].nodeName).toBe('svg');
    });
    test('renders an svg to the left of the text as default when icon position is not set', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: <PlusIcon />,
            theme: 'primary'
        });
        const result = getChildrenNodes(container);
        expect(result[0].nodeName).toBe('svg');
    });
    test('renders an svg to left position as default if "icon" prop is passed in without an "iconPosition" prop', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: <PlusIcon />,
            theme: 'primary'
        });
        const result = getChildrenNodes(container);
        expect(result[0].nodeName).toBe('svg');
    });
    test('fails to render an svg if "icon" prop is not passed in', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'right',
            theme: 'primary'
        });
        expect(container.querySelectorAll('svg').length).toBe(0);
    });
    test('renders an Avatar component when passed in as a custom element', async () => {
        const { container } = setup({
            tagName: 'Default',
            customElement: <Avatar src="randomSource.com" name="Segun Adebayo" />,
            theme: 'primary'
        });
        const result = container.querySelectorAll('span')[1];
        expect(result).toHaveClass('c-avatar');
    });
    test('returns an empty DOM Element if "custom element" and an "icon" are both passed in', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: <PlusIcon />,
            customElement: 'some custom element',
            theme: 'primary'
        });
        expect(container).toBeEmptyDOMElement();
    });
});
