import { render, screen } from '@testing-library/react';
import React from 'react';
import { Switch } from './Switch';
import { switchSchema } from './mockSchema';

test('it renders the switch', () => {
    render(<Switch />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
});

test('it renders the switch with a custom id', () => {
    render(<Switch id="custom-id" />);

    expect(screen.getByRole('switch')).toHaveAttribute('id', 'custom-id');
});

test('it renders the switch with a custom class name', () => {
    render(<Switch className="custom-class-name" />);

    expect(screen.getByRole('switch')).toHaveClass('custom-class-name');
});

test('it renders the switch with a custom size', () => {
    render(<Switch size="small" />);

    expect(screen.getByRole('switch')).toHaveClass('c-switch--small');
});

test('it renders an error message when one is present', () => {
    const setErrorsMock = vi.fn();

    render(
        <Switch
            errors={['Something went wrong, please try again']}
            schema={switchSchema.isActive}
            setErrors={setErrorsMock}
        />
    );
    expect(screen.getByText('Something went wrong, please try again')).toBeInTheDocument();
});
