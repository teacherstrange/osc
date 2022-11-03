import React from 'react';
import { Tag } from './Tag';
import { screen, render } from '@testing-library/react';
import type { Props } from './Tag';

import { SmallAddIcon } from '@chakra-ui/icons';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

// Get children nodes from span
const getChildrenNodes = (container) => container.querySelectorAll('span')[0].childNodes;

describe('Tag component', () => {
    const setup = ({
        tagName,
        className,
        customElement,
        icon,
        iconPosition,
        theme: { backgroundColor, color }
    }: Props) =>
        render(
            <Tag
                tagName={tagName}
                className={className}
                customElement={customElement}
                icon={icon}
                iconPosition={iconPosition}
                theme={{ backgroundColor: backgroundColor, color: color }}
            />
        );
    test('renders a tag with the correct name', () => {
        setup({ tagName: 'Default', theme: { backgroundColor: 'primary', color: 'secondary' } });
        expect(screen.getByText('Default')).toHaveTextContent('Default');
    });
    test('passes correct classNames to Tag component', () => {
        setup({
            tagName: 'Default',
            theme: { backgroundColor: 'primary', color: 'secondary' },
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
            icon: SmallAddIcon,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        expect(container.querySelectorAll('svg').length).toBe(1);
    });
    test('renders an svg to the left of the text when icon position is set to "left"', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'left',
            icon: SmallAddIcon,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });

        const result = getChildrenNodes(container);
        // Check whether first child is an SVG
        expect(result[0].nodeName).toBe('SVG');
    });
    test('renders an svg to the right of the text when icon position is set to "right"', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'right',
            icon: SmallAddIcon,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        const result = getChildrenNodes(container);
        // Check whether second child is an SVG
        expect(result[1].nodeName).toBe('SVG');
    });
    test('renders an svg to the left of the text as default when icon position is not set', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: SmallAddIcon,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        const result = getChildrenNodes(container);
        expect(result[0].nodeName).toBe('SVG');
    });
    test('renders an svg to left position as default if "icon" prop is passed in without an "iconPosition" prop', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: SmallAddIcon,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        const result = getChildrenNodes(container);
        expect(result[0].nodeName).toBe('SVG');
    });
    test('fails to render an svg if "icon" prop is not passed in', () => {
        const { container } = setup({
            tagName: 'Default',
            iconPosition: 'right',
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        expect(container.querySelectorAll('svg').length).toBe(0);
    });
    test('renders an Avatar component when passed in as a custom element', async () => {
        const { container } = setup({
            tagName: 'Default',
            customElement: <ChakraAvatar src="randomSource.com" name="Segun Adebayo" />,
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        const result = container.querySelectorAll('span')[1];
        expect(result).toHaveClass('chakra-avatar');
    });
    test('returns an empty DOM Element if "custom element" and an "icon" are both passed in', () => {
        const { container } = setup({
            tagName: 'Default',
            icon: SmallAddIcon,
            customElement: 'some custom element',
            theme: { backgroundColor: 'primary', color: 'secondary' }
        });
        expect(container).toBeEmptyDOMElement();
    });
});
