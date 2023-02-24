import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Select, SelectItem } from './Select';
import { selectSchema } from './mockData';

test('should render a select component', () => {
    render(
        <Select name="courses-1">
            <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
        </Select>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
});
test('should render a disabled select component', () => {
    const { container } = render(
        <Select disabled={true} name="courses-1">
            <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
        </Select>
    );

    expect(container.querySelector(`button[data-disabled]`)).toBeInTheDocument();
    expect(container.querySelector(`button[disabled]`)).toBeInTheDocument();
});
test('should render a placeholder in the select component', () => {
    const { container } = render(
        <Select placeholder="Please Select" name="courses-1">
            <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
        </Select>
    );

    expect(screen.getByText('Please Select')).toHaveTextContent('Please Select');
    expect(container.querySelector(`button[data-placeholder]`)).toBeInTheDocument();
});
test('should render an error message when errors are present', () => {
    const setErrorsMock = vi.fn();
    render(
        <SpritesheetProvider>
            <Select
                errors={['Please choose an option']}
                placeholder="Please Select"
                name="courses-1"
                schema={selectSchema.courses}
                setErrors={setErrorsMock}
            >
                <SelectItem value="a-level-psychology"> A Level Psychology </SelectItem>
            </Select>
        </SpritesheetProvider>
    );
    expect(screen.getByText('Please choose an option')).toBeInTheDocument();
});
