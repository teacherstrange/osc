import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { SpritesheetProvider } from '../Icon/Icon';
import { TextInput } from './TextInput';
import { textInputSchema } from './mockSchema';

test('should render a text input component and a label', () => {
    render(<TextInput type="text" id="test-input" label="Test Input" name="Test Input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
});

test('should render an asterisk when input field is required', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            label="Test Input"
            name="testInput"
            required={true}
        />
    );
    expect(screen.getByRole('textbox', { name: 'Test Input *' })).toBeInTheDocument();
});

test('should render an icon when passed as a prop', () => {
    render(
        <SpritesheetProvider>
            <TextInput
                type="text"
                id="test-input"
                label="Test Input"
                name="testInput"
                icon={{ id: 'calendar' }}
            />
        </SpritesheetProvider>
    );
    expect(document.querySelector('use')).toBeInTheDocument();
    expect(document.querySelector('use')).toHaveAttribute('href', './spritesheet.svg#calendar');
});

test('should render a button with icon if action is set to type "submit" and passed an Icon', () => {
    render(
        <SpritesheetProvider>
            <TextInput
                type="text"
                id="test-input"
                label="Test Input"
                name="testInput"
                action={{ iconId: 'search' }}
            />
        </SpritesheetProvider>
    );
    expect(document.querySelector('use')).toBeInTheDocument();
    expect(document.querySelector('use')).toHaveAttribute('href', './spritesheet.svg#search');
});

test('should disable the input when disabled prop is true', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            label="Test Input"
            name="testInput"
            disabled={true}
        />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render correct variant classes', () => {
    render(
        <TextInput
            type="text"
            id="test-input"
            label="Test Input"
            name="testInput"
            variants={['secondary']}
        />
    );
    expect(screen.getByLabelText('Test Input')).toHaveClass(
        'c-input__text c-input__text--secondary'
    );
});

test('should render error message if an error is passed in', () => {
    const setErrorsMock = vi.fn();
    render(
        <SpritesheetProvider>
            <TextInput
                type="text"
                id="firstname"
                label="First Name"
                name="firstname"
                errors={['Field is required']}
                schema={textInputSchema.firstname}
                required={true}
                setErrors={setErrorsMock}
            />
        </SpritesheetProvider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Field is required');
});

const ControlledInput = ({ id, label, name, schema }) => {
    const [errors, setErrors] = useState({
        firstname: ['Field is required'],
        email: ['Invalid Email'],
    });

    return (
        <TextInput
            type="text"
            id={id}
            label={label}
            name={name}
            errors={errors[id]}
            schema={schema}
            required={true}
            setErrors={setErrors}
        />
    );
};

test('should clear the error messages when a corrected value is passed in', async () => {
    const user = userEvent.setup();
    render(
        <SpritesheetProvider>
            <ControlledInput
                label="First Name"
                name="firstname"
                id="firstname"
                schema={textInputSchema.firstname}
            />
        </SpritesheetProvider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    const input1 = screen.getByRole('textbox', { name: 'First Name *' });
    await user.type(input1, 'test');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('should render multiple errors if present, and clear them once valid inputs are correctly validated', async () => {
    const user = userEvent.setup();
    render(
        <SpritesheetProvider>
            <ControlledInput id="email" label="Email" name="email" schema={textInputSchema.email} />
        </SpritesheetProvider>
    );

    // Expect two error messages as in accordance with the schema
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid Email');
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter an email address');

    const input1 = screen.getByRole('textbox', { name: 'Email *' });
    await user.type(input1, 'test');

    // Expect only one error once some initial text has been inputted
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid Email');
    expect(screen.queryByRole('alert')).not.toHaveTextContent('Please enter an email address');

    await user.type(input1, '@test.com');

    // Expect no errors once a valid email has been inputted
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('should change focus to second input when using the tab key', async () => {
    const user = userEvent.setup();
    render(
        <>
            <TextInput type="text" id="test-input-1" label="Test Input 1" name="Test Input 1" />
            <TextInput type="text" id="test-input-2" label="Test Input 2" name="Test Input 2" />
        </>
    );

    const input1 = screen.getByRole('textbox', { name: 'Test Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Test Input 2' });

    input1.focus();
    await user.tab();

    expect(input2).toHaveFocus();
});
