import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { SpritesheetProvider } from '../Icon/Icon';
import { TextArea } from './TextArea';
import { z } from 'zod';

const schema = {
    enquiry: z.object({
        enquiry: z.string().trim().min(1),
    }),
};

test('should render a textarea component with a label', () => {
    render(<TextArea id="enquiry" name="Enquiry" />);

    expect(screen.getByRole('textbox', { name: 'Enquiry' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Enquiry' })).toHaveClass('c-textarea');
    expect(screen.getByLabelText('Enquiry')).toBeInTheDocument();
});

test('should render an asterisk when input field is required', () => {
    render(<TextArea id="enquiry" name="Enquiry" required={true} />);
    expect(screen.getByRole('textbox', { name: 'Enquiry *' })).toBeInTheDocument();
});

test('should disable the input when disabled prop is true', () => {
    render(<TextArea id="enquiry" name="Enquiry" disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render an error message if an error is passed in', () => {
    const setErrorsMock = vi.fn();
    render(
        <SpritesheetProvider>
            <TextArea
                id="enquiry"
                name="Enquiry"
                required={true}
                errors={['Field is required']}
                schema={schema.enquiry}
                setErrors={setErrorsMock}
            />
        </SpritesheetProvider>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
});
