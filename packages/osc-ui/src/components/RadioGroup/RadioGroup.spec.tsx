import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RadioGroup, RadioItem } from './RadioGroup';
import { radioSchema } from './mockData';

const radioItems = [
    { id: 'r-yes', name: 'Yes', value: 'yes' },
    { id: 'r-no', name: 'No', value: 'no' },
    { id: 'r-maybe', name: 'Maybe', value: 'maybe' },
];

test('should render a RadioGroup with three RadioItems', () => {
    render(
        <RadioGroup
            description={{ id: 'receive-newsletter-1', value: 'Receive Newsletter' }}
            name="newsletter"
        >
            {radioItems.map(({ id, name, value }, index) => (
                <RadioItem key={index} id={id} name={name} value={value} />
            ))}
        </RadioGroup>
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveClass('c-radio-group');
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    screen
        .getAllByRole('radio')
        .forEach((radio, index) => expect(radio).toHaveValue(radioItems[index].value));
});

test('should render an error message when errors are present', () => {
    const setErrorsMock = vi.fn();
    render(
        <RadioGroup
            description={{ id: 'receive-newsletter-1', value: 'Receive Newsletter' }}
            errors={['Please choose an option']}
            name="newsletter"
            required={true}
            schema={radioSchema.newsletter}
            setErrors={setErrorsMock}
        >
            {radioItems.map(({ id, name, value }, index) => (
                <RadioItem key={index} id={id} name={name} value={value} />
            ))}
        </RadioGroup>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Please choose an option');
});

test('should render a description for the RadioGroup', () => {
    render(
        <RadioGroup
            description={{ value: 'Receive Newsletter', id: 'receive-newsletter' }}
            name="newsletter"
        >
            {radioItems.map(({ id, name, value }, index) => (
                <RadioItem key={index} id={id} name={name} value={value} />
            ))}
        </RadioGroup>
    );
    expect(screen.getByText('Receive Newsletter')).toBeInTheDocument();
});

test('should change focus to second input when using an arrow key', async () => {
    render(
        <RadioGroup
            description={{ id: 'receive-newsletter-1', value: 'Receive Newsletter' }}
            name="newsletter"
            required={true}
        >
            {radioItems.map(({ id, name, value }, index) => (
                <RadioItem key={index} id={id} name={name} value={value} />
            ))}
        </RadioGroup>
    );

    const input1 = screen.getByRole('radio', { name: 'Yes' });
    const input2 = screen.getByRole('radio', { name: 'No' });

    act(() => {
        input1.focus();
    });

    // async/await required with userEvent v-14:
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-events.md
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.keyboard('[ArrowDown]');

    expect(input2).toHaveFocus();
});
