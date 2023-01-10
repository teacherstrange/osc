import { render, screen } from '@testing-library/react';
import React from 'react';
import { TextInput } from './TextInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import userEvent from '@testing-library/user-event';

test('should render a text input component and a label', () => {
    render(<TextInput type="text" id="test-input" name="Test Input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
});

test('should render an asterisk when input field is required', () => {
    render(<TextInput type="text" id="test-input" name="Test Input" required={true} />);
    expect(screen.getByRole('textbox', { name: 'Test Input *' })).toBeInTheDocument();
});

test('should render an icon when passed as a prop', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            name="Test Input"
            icon={{ content: <MagnifyingGlassIcon />, label: 'Magnifying Glass' }}
        />
    );
    expect(screen.getByText('Magnifying Glass')).toBeInTheDocument();
});

test('should render a button with icon if action is set to type "submit" and passed an Icon', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            name="Test Input"
            action={{ label: 'Magnifying Glass', icon: <MagnifyingGlassIcon />, type: 'submit' }}
        />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Magnifying Glass')).toBeInTheDocument();
});

test('should disable the input when disabled prop is true', () => {
    render(<TextInput type="text" id="test-input" name="Test Input" disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render correct variant classes', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            name="Test Input"
            variants={['secondary', 'error']}
        />
    );
    expect(screen.getByLabelText('Test Input')).toHaveClass(
        'c-input__text c-input__text--secondary c-input__text--error'
    );
});

test('should render error message if "wasSubmitted" is true, the field is required, and no value is present', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            name="Test Input"
            required={true}
            variants={['error']}
            wasSubmitted={true}
        />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('should change focus to second input when using the tab key', () => {
    render(
        <>
            <TextInput type="text" id="test-input-1" name="Test Input 1" />
            <TextInput type="text" id="test-input-2" name="Test Input 2" />
        </>
    );

    const input1 = screen.getByRole('textbox', { name: 'Test Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Test Input 2' });

    input1.focus();
    userEvent.tab();

    expect(input2).toHaveFocus();
});
