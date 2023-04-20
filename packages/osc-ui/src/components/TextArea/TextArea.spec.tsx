import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { textAreaSchema } from './mockSchema';
import { TextArea } from './TextArea';

test('should render a textarea component with a label', () => {
    render(<TextArea id="enquiry" label="Enquiry" name="Enquiry" />);

    expect(screen.getByRole('textbox', { name: 'Enquiry' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Enquiry' })).toHaveClass('c-textarea');
    expect(screen.getByLabelText('Enquiry')).toBeInTheDocument();
});

test('should render an asterisk when input field is required', () => {
    render(<TextArea id="enquiry" label="Enquiry" name="Enquiry" required={true} />);
    expect(screen.getByRole('textbox', { name: 'Enquiry *' })).toBeInTheDocument();
});

test('should disable the input when disabled prop is true', () => {
    render(<TextArea id="enquiry" label="Enquiry" name="Enquiry" disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render an error message if an error is passed in', () => {
    const setErrorsMock = vi.fn();
    render(
        <TextArea
            id="enquiry"
            label="Enquiry"
            name="Enquiry"
            required={true}
            errors={['Field is required']}
            schema={textAreaSchema}
            setErrors={setErrorsMock}
        />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
});
