import { render, screen } from '@testing-library/react';
import React from 'react';
import { z } from 'zod';
import { Checkbox } from './Checkbox';

const schema = {
    termsAndConditions: z.object({
        termsAndConditions: z.literal<boolean>(true, {
            errorMap: () => ({ message: 'Please accept the terms and conditions' }),
        }),
    }),
};

test('should render a Checkbox item with a label', () => {
    render(<Checkbox id="call" name="contact" value="Call me as soon as possible" />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveClass('c-checkbox');
    expect(screen.getByLabelText('Call me as soon as possible')).toBeInTheDocument();
});

test('should be disabled when passed the disabled prop', () => {
    render(
        <Checkbox disabled={true} id="call" name="contact" value="Call me as soon as possible" />
    );
    expect(screen.getByRole('checkbox')).toBeDisabled();
});
test('should render an error message when form is submitted and no value is selected', () => {
    const setErrorsMock = vi.fn();
    render(
        <Checkbox
            errors={['Field is required']}
            id="call"
            name="contact"
            required={true}
            schema={schema.termsAndConditions}
            setErrors={setErrorsMock}
            value="Please accept the terms and conditions"
        />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Field is required');
});
test('should render a description for the Checkbox', () => {
    render(
        <Checkbox
            description={{
                id: 'contact-soon',
                value: "If you'd rather we call you sooner, check the box below",
            }}
            id="call"
            name="contact"
            required={true}
            value="Call me as soon as possible"
        />
    );
    expect(
        screen.getByText("If you'd rather we call you sooner, check the box below")
    ).toBeInTheDocument();
});
