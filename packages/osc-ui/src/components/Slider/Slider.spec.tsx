import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Slider } from './Slider';

global.ResizeObserver = require('resize-observer-polyfill');

test('should render a text input component and a label', () => {
    render(<Slider min={0} max={1000} name="Price" defaultValue={[25, 500]} />);
    expect(screen.getByRole('slider', { name: 'Minimum' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Maximum' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveTextContent('25');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveTextContent('500');
});

test('should render the correct prefix as part of the slider value when passed as a prop', () => {
    render(<Slider min={0} max={1000} name="Price" defaultValue={[25, 500]} prefix={'£'} />);
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveTextContent('£25');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveTextContent('£500');
});

test('should move the min value slider up by increment of 5 when "step" is set to "5"', async () => {
    render(<Slider min={0} max={1000} name="Price" defaultValue={[25, 500]} step={5} />);
    const minThumbSlider = screen.getByRole('slider', { name: 'Minimum' });
    minThumbSlider.focus();
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveTextContent('25');
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.keyboard('[ArrowUp]');
    expect(screen.getByRole('slider', { name: 'Minimum' })).toHaveTextContent('30');
});
test('should move the value max value down by increment of 10 when "step" is set to "10"', async () => {
    render(<Slider min={0} max={1000} name="Price" defaultValue={[25, 500]} step={10} />);
    const minThumbSlider = screen.getByRole('slider', { name: 'Minimum' });
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveTextContent('500');
    minThumbSlider.focus();
    userEvent.tab();
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.keyboard('[ArrowDown]');
    expect(screen.getByRole('slider', { name: 'Maximum' })).toHaveTextContent('490');
});
