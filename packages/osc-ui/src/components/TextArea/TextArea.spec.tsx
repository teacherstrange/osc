import { screen } from '@testing-library/react';
import React from 'react';
import { render } from 'test-utils';
import { Icon } from '../Icon/Icon';
import { TextArea } from './TextArea';

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

test('should render an icon when passed as a prop', () => {
    render(
        <TextArea
            icon={{
                content: <Icon id="exclamation-mark" />,
                label: 'Exclamation Triangle Icon',
                type: 'error',
            }}
            id="enquiry"
            name="Enquiry"
            required={true}
            wasSubmitted={true}
        />
    );

    expect(document.querySelector('use')).toBeInTheDocument();
    expect(document.querySelector('use')).toHaveAttribute(
        'href',
        './spritesheet.svg#exclamation-mark'
    );
});

test('should disable the input when disabled prop is true', () => {
    render(<TextArea id="enquiry" name="Enquiry" disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
});

test('should render an error message if "wasSubmitted" is true, the field is required, and no value is present', () => {
    render(<TextArea id="enquiry" name="Enquiry" required={true} wasSubmitted={true} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
});
