import { render, screen } from '@testing-library/react';
import React from 'react';
import { SpritesheetProvider } from '../Icon/Icon';
import { Select, SelectItem } from './Select';

test('should render a select component', () => {
    render(
        <SpritesheetProvider>
            <Select name="courses-1">
                <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
            </Select>
        </SpritesheetProvider>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
});
test('should render a disabled select component', () => {
    const { container } = render(
        <SpritesheetProvider>
            <Select disabled={true} name="courses-1">
                <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
            </Select>
        </SpritesheetProvider>
    );

    expect(container.querySelector(`button[data-disabled]`)).toBeInTheDocument();
    expect(container.querySelector(`button[disabled]`)).toBeInTheDocument();
});
test('should render a placeholder in the select component', () => {
    const { container } = render(
        <SpritesheetProvider>
            <Select placeholder="Please Select" name="courses-1">
                <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
            </Select>
        </SpritesheetProvider>
    );

    expect(screen.getByText('Please Select')).toHaveTextContent('Please Select');
    expect(container.querySelector(`button[data-placeholder]`)).toBeInTheDocument();
});
