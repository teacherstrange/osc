import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SpritesheetProvider } from '../Icon/Icon';
import { TextInput } from './TextInput';

import { z } from 'zod';

const schema = {
    firstname: z.object({
        firstname: z.string().trim().min(1, { message: 'Field is required' }),
    }),
};

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
        <SpritesheetProvider>
            <TextInput type="text" id="test-input" name="Test Input" icon={{ id: 'calendar' }} />
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
                name="Test Input"
                action={{ iconId: 'search' }}
            />
        </SpritesheetProvider>
    );
    expect(document.querySelector('use')).toBeInTheDocument();
    expect(document.querySelector('use')).toHaveAttribute('href', './spritesheet.svg#search');
});

test('should disable the input when disabled prop is true', () => {
    render(<TextInput type="text" id="test-input" name="Test Input" disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render correct variant classes', () => {
    render(<TextInput type="text" id="test-input" name="Test Input" variants={['secondary']} />);
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
                name="First Name"
                errors={['Field is required']}
                schema={schema.firstname}
                required={true}
                setErrors={setErrorsMock}
            />
        </SpritesheetProvider>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Field is required');
});

test('should change focus to second input when using the tab key', async () => {
    const user = userEvent.setup();

    render(
        <>
            <TextInput type="text" id="test-input-1" name="Test Input 1" />
            <TextInput type="text" id="test-input-2" name="Test Input 2" />
        </>
    );

    const input1 = screen.getByRole('textbox', { name: 'Test Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Test Input 2' });

    input1.focus();
    await user.tab();

    expect(input2).toHaveFocus();
});
